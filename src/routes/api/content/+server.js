import { getContent } from '$lib/utils/sanity';

export async function GET() {
	try {
		const content = await getContent();
		return new Response(JSON.stringify(content));
	} catch (e) {
		return new Response(undefined, { status: 404 });
	}
}
