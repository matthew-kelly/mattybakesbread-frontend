import { getOrder } from '$lib/utils/sanity';

export async function post({ request }) {
  const { id, email } = await request.json();

  try {
    const order = await getOrder({ id, email });
    if (!order) {
      return null;
    }
    order.payment = JSON.parse(order.payment);
    return {
      body: JSON.stringify(order),
    };
  } catch (e) {
    console.log('Error: ', e);
    return null;
  }
}
