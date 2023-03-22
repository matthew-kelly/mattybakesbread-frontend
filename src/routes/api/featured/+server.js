import { getFeatured } from '$lib/utils/sanity';

export async function GET() {
  try {
    const featured = await getFeatured();
    return new Response(JSON.stringify(featured));
  } catch (e) {
    return new Response(undefined, { status: 404 });
  }
}
