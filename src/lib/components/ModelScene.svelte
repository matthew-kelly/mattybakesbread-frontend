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
	<!-- <Canvas toneMapping={0} colorSpace="srgb-linear" colorManagementEnabled={false} > -->
	<!-- when they remove legacy lights you're fucked matty -->
	<Canvas useLegacyLights={true} colorSpace="srgb-linear" toneMapping={0}>
		<Model3D />
	</Canvas>
</div>
