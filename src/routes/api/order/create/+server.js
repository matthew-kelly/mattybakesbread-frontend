import { createOrder } from '$lib/utils/sanityBackend';

export async function POST({ request }) {
  const { order } = await request.json();
  try {
    const res = await createOrder(order);
    return new Response(JSON.stringify(res));
  } catch (e) {
    return new Response(undefined, { status: 404 });
  }
}
