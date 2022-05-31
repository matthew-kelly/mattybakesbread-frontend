import Stripe from 'stripe';
import 'dotenv/config';

// initialize Stripe
const stripe = new Stripe(process.env['STRIPE_SECRET_KEY']);

// handle POST /create-payment-intent
export async function post({ request }) {
  const { total } = await request.json();
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: 'cad',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  // return the clientSecret to the client
  return {
    body: {
      clientSecret: paymentIntent.client_secret,
    },
  };
}
