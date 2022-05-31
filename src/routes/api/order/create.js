import { createOrder } from '$lib/utils/sanityBackend';

export async function post({ request }) {
  const { order } = await request.json();
  try {
    const res = await createOrder(order);
    return {
      body: JSON.stringify(res),
    };
  } catch (e) {
    return {
      error: 'There was an error creating the order',
      status: 404,
    };
  }
}
