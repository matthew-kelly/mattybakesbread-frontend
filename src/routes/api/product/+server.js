import { getProduct } from '$lib/utils/sanity';

export async function POST({ request }) {
  const { slug } = await request.json();

  try {
    const product = await getProduct({ slug: slug });
    return new Response(JSON.stringify(product));
  } catch (e) {
    return new Response(undefined, { status: 404 });
  }
}
