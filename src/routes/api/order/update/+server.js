import { updateOrderWithPayment } from '$lib/utils/sanityBackend';

export async function POST({ request }) {
  const { method, order, payment, status } = await request.json();

  try {
    const res = await updateOrderWithPayment({ method, data: order, payment, status });
    return new Response(JSON.stringify(res));
  } catch (e) {
    return new Response(undefined, { status: 404 });
  }
}
