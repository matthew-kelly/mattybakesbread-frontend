import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: '2021-10-21',
  useCdn: false,
});

export default client;

const getProduct = async ({ id = null, slug = null }) => {
  const query = slug ? `slug.current == "${slug}"` : `_id == "${id}"`;
  const product = await client.fetch(`*[_type == "product" && ${query}][0]`);
  return product;
};

const getProducts = async () => {
  const products = await client.fetch(`*[_type == "product"]`);
  return products;
};

const getFeatured = async () => {
  const featured = await client.fetch(`*[_type == "featured"]{ _id, blurb, product-> }`);
  return featured;
};

export { getProduct, getProducts, getFeatured };
