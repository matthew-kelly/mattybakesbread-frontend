import { getProducts } from '../utils/sanity';

export async function getProductsForSitemap() {
  const products = await Object.entries(await getProducts())
    .map(([, product]) => ({
      title: product.name,
      slug: product.slug.current,
      date: product._createdAt,
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return products;
}
