export async function load({ fetch }) {
	const content = await fetch('/api/content')
		.then((res) => res.json())
		.catch((err) => console.error(err));
	return {
		content,
		title: 'Content',
		description:
			'Matty loves posting pictures of his sourdough bread on on Instagram @mattybakesbread, no matter how unflattering the lighting or camera angle.',
	};
}
