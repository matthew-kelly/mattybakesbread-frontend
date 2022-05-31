import { getProduct } from '$lib/utils/sanity';

export async function post({ request }) {
  const { slug } = await request.json();

  try {
    const product = await getProduct({ slug: slug });
    return {
      body: JSON.stringify(product),
    };
  } catch (e) {
    return {
      error: 'Product not found',
      status: 404,
    };
  }
}
