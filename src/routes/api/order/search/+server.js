import { getOrder } from '$lib/utils/sanity';

export async function POST({ request }) {
	const { id, email } = await request.json();

	try {
		const order = await getOrder({ id, email });
		if (!order) {
			return new Response(undefined, { status: 404 });
		}
		order.payment = JSON.parse(order.payment);
		return new Response(JSON.stringify(order));
	} catch (err) {
		console.error(err);

		return new Response(undefined, { status: 404 });
	}
}
