import { getContent } from '$lib/utils/sanity';

export async function get() {
  try {
    const content = await getContent();
    return {
      body: JSON.stringify(content),
    };
  } catch (e) {
    return {
      error: 'No content found',
      status: 404,
    };
  }
}
