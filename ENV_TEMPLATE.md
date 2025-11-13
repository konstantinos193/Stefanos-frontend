# Frontend Environment Variables

Create a `.env.local` file in the `frontend` directory with these variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Stripe Payment Processing
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# Optional: Analytics (if you want to add later)
# NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Optional: Sentry (for error tracking)
# NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

## Getting Your Stripe Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Copy the **Publishable key** (starts with `pk_test_`)
3. Paste it in `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

For production, use your live keys (starts with `pk_live_`).

