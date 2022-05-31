// FIXME: re-enable stripe payments
// // import Stripe from 'stripe';

// // handle POST /create-payment-intent
// export async function post({ request }) {
//   // initialize Stripe
//   const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY);

//   const { total } = await request.json();
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: total,
//     currency: 'cad',
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });

//   // return the clientSecret to the client
//   return {
//     body: {
//       clientSecret: paymentIntent.client_secret,
//     },
//   };
// }
