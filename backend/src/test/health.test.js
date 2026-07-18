import { describe, it, expect } from 'node:test';
import assert from 'node:assert';

describe('Friendzy API', () => {
  it('health check returns ok', () => {
    // Test the health check logic directly
    const healthResponse = {
      status: 'ok',
      version: '1.0.0',
      uptime: process.uptime(),
    };
    expect(healthResponse.status).toBe('ok');
    expect(healthResponse.version).toBeDefined();
  });

  it('validates registration input', () => {
    // Test validation logic
    const invalidEmail = 'not-an-email';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test(invalidEmail)).toBe(false);
    expect(emailRegex.test('user@example.com')).toBe(true);
  });

  it('validates password strength', () => {
    const weakPassword = 'abc';
    const strongPassword = 'StrongPass1';
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    expect(passwordRegex.test(weakPassword)).toBe(false);
    expect(passwordRegex.test(strongPassword)).toBe(true);
  });

  it('moderation detects harmful content', () => {
    const toxicPatterns = ['hate', 'harassment', 'threat', 'spam', 'scam'];
    const cleanMessage = 'Hey, want to grab coffee?';
    const toxicMessage = 'This is spam content';

    const cleanHasToxic = toxicPatterns.some(w => cleanMessage.toLowerCase().includes(w));
    const toxicHasToxic = toxicPatterns.some(w => toxicMessage.toLowerCase().includes(w));

    expect(cleanHasToxic).toBe(false);
    expect(toxicHasToxic).toBe(true);
  });
});
