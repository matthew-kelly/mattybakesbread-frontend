import { getProducts, getProductsById } from '$lib/utils/sanity';
import { updateProductStock } from '$lib/utils/sanityBackend';

// fetch all
export async function GET() {
  try {
    const products = await getProducts();
    return new Response(JSON.stringify(products));
  } catch (e) {
    return new Response(undefined, { status: 404 });
  }
}

// fetch by ids
export async function POST({ request }) {
  const { ids } = await request.json();

  try {
    const products = await getProductsById(ids);
    return new Response(JSON.stringify(products));
  } catch (e) {
    return new Response(undefined, { status: 404 });
  }
}

// update remaining stock
export async function PUT({ request }) {
  const { contents } = await request.json();
  try {
    const products = await updateProductStock(contents);
    return new Response(JSON.stringify(products));
  } catch (e) {
    return new Response(undefined, { status: 404 });
  }
}
