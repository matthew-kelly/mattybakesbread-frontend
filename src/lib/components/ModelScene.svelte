<script>
	import { Canvas } from '@threlte/core';
	import { onMount } from 'svelte';
	import Model3D from './Model3D.svelte';

	let isLoading = true;
	onMount(() => {
		isLoading = false;
	});
</script>

<div class="canvas-container md:desktop transition-opacity duration-1000 {isLoading ? 'opacity-0' : 'opacity-100'}">
	<Canvas linear flat>
		<Model3D />
	</Canvas>
</div>
