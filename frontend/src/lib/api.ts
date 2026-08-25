import { supabase } from './supabase';

// In dev: hit local backend. In prod: use VITE_API_URL (Render backend) when set, else same-origin /api.
const API_BASE = (() => {
  if (import.meta.env.DEV) return 'http://localhost:3001/api';
  const env = import.meta.env.VITE_API_URL?.trim();
  if (!env) return '/api';
  return env.endsWith('/api') ? env : env.replace(/\/+$/, '') + '/api';
})();

class ApiClient {
  private async getToken(): Promise<string | null> {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  }

  private async request<T>(method: string, path: string, body?: any): Promise<T> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    const token = await this.getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;

    let res: Response;
    try {
      res = await fetch(`${API_BASE}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });
    } catch {
      throw new Error('Cannot connect to server. Make sure the backend is running.');
    }

    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP ${res.status}`);
    }
    return res.json();
  }

  // Users
  async getUsers(params?: { search?: string; region?: string }) {
    const q = new URLSearchParams(params as any).toString();
    return this.request<any>('GET', `/users${q ? '?' + q : ''}`);
  }

  async updateUserMood(mood: string) {
    return this.request<any>('PUT', '/users/mood', { mood });
  }

  // Matches
  async getMatches(userId: string, params?: { limit?: number }) {
    const q = new URLSearchParams(params as any).toString();
    return this.request<any>('GET', `/matches/${userId}${q ? '?' + q : ''}`);
  }

  async likeMatch(userId: string, matchId: string) {
    return this.request<any>('POST', `/matches/${userId}/like/${matchId}`);
  }

  async passMatch(userId: string, matchId: string) {
    return this.request<any>('POST', `/matches/${userId}/pass/${matchId}`);
  }

  // Chat
  async getConversations() {
    return this.request<any>('GET', '/chat/conversations');
  }

  async getMessages(chatId: string) {
    return this.request<any>('GET', `/chat/conversations/${chatId}/messages`);
  }

  async sendMessage(chatId: string, text: string) {
    return this.request<any>('POST', `/chat/conversations/${chatId}/messages`, { text });
  }

  // Payments
  async getPricing(region: string) {
    return this.request<any>('GET', `/payments/pricing/${region}`);
  }

  async initializePayment(data: { email: string; plan: string; region: string }) {
    return this.request<any>('POST', '/payments/initialize', data);
  }

  // Moderation
  async blockUser(userId: string, blockedUserId: string) {
    return this.request<any>('POST', '/moderation/block', { userId, blockedUserId });
  }

  async reportUser(data: { reporterId: string; reportedUserId: string; reason: string; description?: string }) {
    return this.request<any>('POST', '/moderation/report', data);
  }

  async getHotlines(region: string) {
    return this.request<any>('GET', `/moderation/hotlines/${region}`);
  }

  // Verification
  async submitVerification(data: { userId: string; idType: string; fullName: string; dateOfBirth: string }) {
    return this.request<any>('POST', '/verification/submit', data);
  }

  async getVerificationStatus(userId: string) {
    return this.request<any>('GET', `/verification/status/${userId}`);
  }

  // Groups
  async getGroups(params?: { interest?: string; status?: string }) {
    const q = new URLSearchParams(params as any).toString();
    return this.request<any>('GET', `/groups${q ? '?' + q : ''}`);
  }

  async joinGroup(groupId: string, userId: string) {
    return this.request<any>('POST', `/groups/${groupId}/join`, { userId });
  }
}

export const api = new ApiClient();
