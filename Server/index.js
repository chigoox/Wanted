const stripe = require('stripe')('sk_test_51MamPiLPNdUzkCF3xdRvn0nkLpOrsJFo1um4Z7e07FlQXH6T7HCHhRxYkVjkK2iPW61EMZKoDM0ml6YSdWmAPcEn00E3jb1Gcr');

const paymentIntent = await stripe.paymentIntents.create({
  amount: 1099,
  currency: 'usd',
});
const clientSecret = paymentIntent.client_secret
// Pass the client secret to the client