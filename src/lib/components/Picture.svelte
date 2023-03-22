<script>
	export let width;
	export let height;
	export let alt;
	export let classes;

	const src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`;
</script>

<picture>
	<slot />
	<img {src} {alt} class={classes} />
</picture>
