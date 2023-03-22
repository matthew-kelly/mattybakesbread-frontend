import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	try {
		const product = await fetch('/api/product', { method: 'POST', body: JSON.stringify({ slug: params.slug }) })
			.then((res) => res.json())
			.catch((err) => console.error(err));

		return {
			product,
			title: product.name,
		};
	} catch (e) {
		throw error(404, 'Product not found');
	}
}
