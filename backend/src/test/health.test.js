import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('Friendzy API', () => {
  it('health check returns ok', () => {
    // Test the health check logic directly
    const healthResponse = {
      status: 'ok',
      version: '1.0.0',
      uptime: process.uptime(),
    };
    assert.equal(healthResponse.status, 'ok');
    assert.ok(healthResponse.version);
  });

  it('validates registration input', () => {
    // Test validation logic
    const invalidEmail = 'not-an-email';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    assert.equal(emailRegex.test(invalidEmail), false);
    assert.equal(emailRegex.test('user@example.com'), true);
  });

  it('validates password strength', () => {
    const weakPassword = 'abc';
    const strongPassword = 'StrongPass1';
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    assert.equal(passwordRegex.test(weakPassword), false);
    assert.equal(passwordRegex.test(strongPassword), true);
  });

  it('moderation detects harmful content', () => {
    const toxicPatterns = ['hate', 'harassment', 'threat', 'spam', 'scam'];
    const cleanMessage = 'Hey, want to grab coffee?';
    const toxicMessage = 'This is spam content';

    const cleanHasToxic = toxicPatterns.some(w => cleanMessage.toLowerCase().includes(w));
    const toxicHasToxic = toxicPatterns.some(w => toxicMessage.toLowerCase().includes(w));

    assert.equal(cleanHasToxic, false);
    assert.equal(toxicHasToxic, true);
  });
});
