import { getFeatured } from '$lib/utils/sanity';

export async function get() {
  try {
    const featured = await getFeatured();
    return {
      body: JSON.stringify(featured),
    };
  } catch (e) {
    return {
      error: 'No featured posts found',
      status: 404,
    };
  }
}
