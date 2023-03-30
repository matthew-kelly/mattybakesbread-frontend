<script>
	export let width;
	export let height;
	export let alt;
	export let classesPicture = '';
	export let classes = '';
	export let blur = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`;
</script>

<picture class={classesPicture}>
	<slot />
	<img src={blur} {height} {alt} class={classes} />
</picture>
