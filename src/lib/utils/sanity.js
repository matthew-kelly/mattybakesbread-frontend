import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: '2021-10-21',
  useCdn: true,
});

export default client;

const getProduct = async ({ id = null, slug = null }) => {
  const query = slug ? `slug.current == "${slug}"` : `_id == "${id}"`;
  const product = await client.fetch(`*[_type == "product" && ${query}][0]`);
  return product;
};

const getProducts = async () => {
  const products = await client.fetch(`*[_type == "product"] | order(_createdAt desc)`);
  return products;
};

const getProductsById = async (ids = null) => {
  if (!ids) return [];
  const products = await client.fetch('*[_id in $ids]', { ids });
  return products;
};

const getFeatured = async () => {
  const featured = await client.fetch(
    `*[_type == "featured"] | order(_createdAt desc)[0..1] | { _id, type, title, link, linkText, blurb, product-> }`
  );
  return featured;
};

const getContent = async () => {
  const content = await client.fetch(`*[_type == "content"] | order(_createdAt desc)`);
  return content;
};

const getOrder = async ({ id, email }) => {
  const order = await client.fetch(
    `*[_type == "order" && _id == "${id}" && email == "${email}"][0]{ ..., contents[]{..., product->} }`
  );
  if (!order) {
    return null;
  }
  return order;
};

export { getProduct, getProducts, getProductsById, getFeatured, getContent, getOrder };
