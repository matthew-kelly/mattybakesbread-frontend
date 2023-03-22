export async function load({ fetch }) {
	const data = await fetch('/api/products')
		.then((res) => res.json())
		.catch((err) => console.error(err));
	return {
		products: data,
		title: 'Shop',
	};
}
