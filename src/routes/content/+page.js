export async function load({ fetch }) {
	const content = await fetch('/api/content')
		.then((res) => res.json())
		.catch((err) => console.error(err));
	return {
		content,
		title: 'Content',
	};
}
