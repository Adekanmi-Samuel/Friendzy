import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || 'sk_test_xxx';
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

const plans = {
  premium: {
    name: 'Premium',
    amountNGN: 500000, // kobo (₦5,000)
    amountUSD: 999, // cents ($9.99)
    features: ['Unlimited matches', 'Real-time translation', 'See who liked you', 'Unlimited calls', 'Priority support']
  },
  vip: {
    name: 'VIP',
    amountNGN: 1000000, // kobo (₦10,000)
    amountUSD: 2999, // cents ($29.99)
    features: ['Everything in Premium', 'Dedicated matchmaker', 'Group hangouts', 'Profile boost', 'VIP badge']
  },
};

const regionalPricing = {
  NG: { premium: 500000, vip: 1000000, currency: 'NGN' },
  US: { premium: 999, vip: 2999, currency: 'USD' },
  UK: { premium: 799, vip: 1599, currency: 'GBP' },
  IN: { premium: 599, vip: 1299, currency: 'USD' },
  BR: { premium: 799, vip: 1599, currency: 'USD' },
  EU: { premium: 899, vip: 1799, currency: 'EUR' },
};

// Get pricing for region
router.get('/pricing/:region', asyncHandler(async (req, res) => {
  const pricing = regionalPricing[req.params.region] || regionalPricing.NG;
  res.json({ region: req.params.region, ...pricing, plans });
}));

// Initialize Paystack transaction
router.post('/initialize', asyncHandler(async (req, res) => {
  const { email, plan, region } = req.body;

  if (!email || !plan || !plans[plan]) {
    return res.status(400).json({ error: 'Valid email and plan (premium/vip) required' });
  }

  const pricing = regionalPricing[region] || regionalPricing.NG;
  const amount = plan === 'premium' ? pricing.premium : pricing.vip;

  const reference = `friendzy_${plan}_${uuidv4().slice(0, 8)}`;

  // In production, call Paystack API:
  // const response = await axios.post(
  //   `${PAYSTACK_BASE_URL}/transaction/initialize`,
  //   { email, amount, reference, callback_url: `${process.env.FRONTEND_URL}/payment/verify` },
  //   { headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`, 'Content-Type': 'application/json' } }
  // );

  // Mock response for development
  res.json({
    success: true,
    reference,
    authorization_url: `https://checkout.paystack.com/${reference}`,
    access_code: `test_${reference}`,
    amount,
    currency: pricing.currency,
    plan,
  });
}));

// Verify payment
router.get('/verify/:reference', asyncHandler(async (req, res) => {
  const { reference } = req.params;

  // In production, verify with Paystack:
  // const response = await axios.get(
  //   `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
  //   { headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` } }
  // );

  // Mock verification
  res.json({
    success: true,
    status: 'success',
    reference,
    amount: 500000,
    currency: 'NGN',
    plan: 'premium',
    subscription: {
      status: 'active',
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
  });
}));

// Paystack webhook
router.post('/webhook', asyncHandler(async (req, res) => {
  const { event, data } = req.body;

  console.log(`[${new Date().toISOString()}] Paystack webhook: ${event}`);

  switch (event) {
    case 'charge.success':
      // Payment successful — activate subscription
      console.log(`Payment successful: ${data.reference}`);
      break;
    case 'subscription.create':
      console.log(`Subscription created: ${data.subscription_code}`);
      break;
    case 'subscription.disable':
      console.log(`Subscription disabled: ${data.subscription_code}`);
      break;
    case 'invoice.payment_failed':
      console.log(`Payment failed for: ${data.subscription_code}`);
      break;
  }

  res.json({ received: true });
}));

// Get subscription status
router.get('/subscription/:userId', asyncHandler(async (req, res) => {
  res.json({
    plan: 'free',
    status: 'active',
    currentPeriodEnd: null,
    cancelAtPeriodEnd: false,
    features: plans.premium.features.slice(0, 2), // Free gets limited features
  });
}));

// Cancel subscription
router.post('/cancel', asyncHandler(async (req, res) => {
  const { userId, reason } = req.body;
  console.log(`Subscription cancelled: ${userId}, reason: ${reason || 'none'}`);
  res.json({ success: true, message: 'Subscription cancelled. Access continues until end of billing period.' });
}));

export default router;
