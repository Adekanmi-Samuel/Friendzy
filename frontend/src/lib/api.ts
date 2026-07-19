const API_BASE = import.meta.env.DEV ? 'http://localhost:3001/api' : '/api';

class ApiClient {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('friendzy-token', token);
  }

  getToken() {
    if (!this.token) this.token = localStorage.getItem('friendzy-token');
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('friendzy-token');
  }

  private async request<T>(method: string, path: string, body?: any): Promise<T> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    const token = this.getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}${path}`, {
      method, headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP ${res.status}`);
    }
    return res.json();
  }

  // Auth
  async register(data: { name: string; email: string; password: string }) {
    const r = await this.request<any>('POST', '/auth/register', data);
    if (r.token) this.setToken(r.token);
    return r;
  }

  async login(email: string, password: string) {
    const r = await this.request<any>('POST', '/auth/login', { email, password });
    if (r.token) this.setToken(r.token);
    return r;
  }

  async getMe() { return this.request<any>('GET', '/auth/me'); }

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
  async getConversations() { return this.request<any>('GET', '/chat/conversations'); }
  async getMessages(chatId: string) { return this.request<any>('GET', `/chat/conversations/${chatId}/messages`); }
  async sendMessage(chatId: string, text: string) {
    return this.request<any>('POST', `/chat/conversations/${chatId}/messages`, { text });
  }

  // Payments
  async getPricing(region: string) { return this.request<any>('GET', `/payments/pricing/${region}`); }
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
  async getHotlines(region: string) { return this.request<any>('GET', `/moderation/hotlines/${region}`); }

  // Verification
  async submitVerification(data: { userId: string; idType: string; fullName: string; dateOfBirth: string }) {
    return this.request<any>('POST', '/verification/submit', data);
  }
  async getVerificationStatus(userId: string) { return this.request<any>('GET', `/verification/status/${userId}`); }

  // Groups
  async getGroups(params?: { interest?: string; status?: string }) {
    const q = new URLSearchParams(params as any).toString();
    return this.request<any>('GET', `/groups${q ? '?' + q : ''}`);
  }
  async joinGroup(groupId: string, userId: string) {
    return this.request<any>('POST', `/groups/${groupId}/join`, { userId });
  }

  // Admin
  async adminLogin(email: string, password: string) {
    return this.request<any>('POST', '/admin/login', { email, password });
  }
  async getAdminDashboard() { return this.request<any>('GET', '/admin/dashboard'); }
  async getAdminUsers(params?: { search?: string }) {
    const q = new URLSearchParams(params as any).toString();
    return this.request<any>('GET', `/admin/users${q ? '?' + q : ''}`);
  }
  async getAdminReports(params?: { status?: string }) {
    const q = new URLSearchParams(params as any).toString();
    return this.request<any>('GET', `/admin/reports${q ? '?' + q : ''}`);
  }
  async getAdminAnalytics() { return this.request<any>('GET', '/admin/analytics'); }
}

export const api = new ApiClient();
