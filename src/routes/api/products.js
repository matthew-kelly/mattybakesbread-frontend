import { getProducts, getProductsById } from '$lib/utils/sanity';
import { updateProductStock } from '$lib/utils/sanityBackend';

// fetch all
export async function get() {
  try {
    const products = await getProducts();
    return {
      body: JSON.stringify(products),
    };
  } catch (e) {
    return {
      error: 'No products found',
      status: 404,
    };
  }
}

// fetch by ids
export async function post({ request }) {
  const { ids } = await request.json();

  try {
    const products = await getProductsById(ids);
    return {
      body: JSON.stringify(products),
    };
  } catch (e) {
    return {
      error: 'No products found',
      status: 404,
    };
  }
}

// update remaining stock
export async function put({ request }) {
  const { contents } = await request.json();
  console.log('/api/products line 39 res', contents);
  try {
    const products = await updateProductStock(contents);
    console.log('/api/products line 42 products', products);
    return {
      body: JSON.stringify(products),
    };
  } catch (e) {
    return {
      error: 'Unable to update products',
      status: 404,
    };
  }
}
