import { updateOrderWithPayment } from '$lib/utils/sanityBackend';

export async function post({ request }) {
  const { method, order, payment, status } = await request.json();

  try {
    const res = await updateOrderWithPayment({ method, data: order, payment, status });
    return {
      body: JSON.stringify(res),
    };
  } catch (e) {
    return {
      error: 'There was an error updating the order',
      status: 404,
    };
  }
}
