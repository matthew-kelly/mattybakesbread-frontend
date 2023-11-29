import { error } from '@sveltejs/kit';
import { urlFor } from '$lib/utils/sanityImage';
import formatMoney from '$lib/helpers/formatMoney';

export async function load({ params, fetch }) {
	try {
		const product = await fetch('/api/product', { method: 'POST', body: JSON.stringify({ slug: params.slug }) })
			.then((res) => res.json())
			.catch((err) => console.error(err));

		const structuredData = {
			'@context': 'https://schema.org',
			'@type': 'Product',
			name: product.name,
			description: product.description,
			image: urlFor(product.image).width(250).height(250).url(),
			offers: {
				'@type': 'Offer',
				price: formatMoney(product.price, false).replace(/\$/g, ''),
				priceCurrency: 'CAD',
			},
		};

		return {
			product,
			title: product.name,
			description: `${product.name}, made just for you by Matty. ${product.description}`,
			structuredData,
		};
	} catch (e) {
		throw error(404, 'Product not found');
	}
}
