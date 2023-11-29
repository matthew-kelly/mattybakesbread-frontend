export async function load({ fetch }) {
	const data = await fetch('/api/products')
		.then((res) => res.json())
		.catch((err) => console.error(err));
	return {
		products: data,
		title: 'Shop',
		description:
			'Order sourdough bread and other baked goods from the online bakery by Matty. Serving Vancouver and the Sunshine Coast since 2020.',
	};
}
