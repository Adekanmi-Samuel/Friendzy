import { Router } from 'express';

const router = Router();

const plans = {
  free: { name: 'Free', price: 0, features: ['10 matches/day', '5 voice calls/mo', '2 video calls/mo', 'Basic translation', 'Community support'] },
  premium: { name: 'Premium', price: 9.99, features: ['Unlimited matches', 'Unlimited calls', 'Real-time translation', 'Priority matching', 'Priority support', 'See who liked you'] },
  vip: { name: 'VIP', price: 19.99, features: ['Everything in Premium', 'Dedicated matchmaker', 'Group hangouts', 'Profile boost', 'VIP events', 'Early access'] },
};

const regionPricing = {
  US: { premium: 9.99, vip: 19.99, currency: 'USD' },
  EU: { premium: 8.99, vip: 17.99, currency: 'EUR' },
  NG: { premium: 5000, vip: 10000, currency: 'NGN' },
  IN: { premium: 5.99, vip: 12.99, currency: 'USD' },
  BR: { premium: 7.99, vip: 15.99, currency: 'USD' },
  SEA: { premium: 5.99, vip: 12.99, currency: 'USD' },
};

// Get plans
router.get('/plans', (req, res) => {
  res.json({ plans, regionPricing });
});

// Get pricing for region
router.get('/pricing/:region', (req, res) => {
  const pricing = regionPricing[req.params.region] || regionPricing.US;
  res.json({ region: req.params.region, ...pricing });
});

// Create checkout session (mock - integrate Stripe/Paystack in production)
router.post('/checkout', (req, res) => {
  const { plan, region, email } = req.body;

  if (!plans[plan]) {
    return res.status(400).json({ error: 'Invalid plan' });
  }

  const pricing = regionPricing[region] || regionPricing.US;

  res.json({
    sessionId: `session_${Date.now()}`,
    plan: plans[plan].name,
    amount: plan === 'free' ? 0 : pricing[plan],
    currency: pricing.currency,
    checkoutUrl: `https://checkout.friendzy.app/pay/${Date.now()}`,
    provider: region === 'NG' ? 'paystack' : 'stripe',
  });
});

// Webhook handler (mock)
router.post('/webhook', (req, res) => {
  const { event, sessionId, status } = req.body;
  console.log(`Payment webhook: ${event} for ${sessionId} - ${status}`);
  res.json({ received: true });
});

// Get subscription status
router.get('/subscription/:userId', (req, res) => {
  res.json({
    plan: 'premium',
    status: 'active',
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    cancelAtPeriodEnd: false,
  });
});

export default router;
