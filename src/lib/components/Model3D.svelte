<script>
	import { spring } from 'svelte/motion';
	import { T, useFrame } from '@threlte/core';
	import { useGltf } from '@threlte/extras';
	import modelCake from '$lib/assets/models/cake.glb';
	import modelCakeBirthday from '$lib/assets/models/cakeBirthday.glb';
	import modelCroissant from '$lib/assets/models/croissant.glb';
	import modelDonutSprinkles from '$lib/assets/models/donutSprinkles.glb';
	import modelLoaf from '$lib/assets/models/loaf.glb';
	import modelPie from '$lib/assets/models/pie.glb';
	import modelPizza from '$lib/assets/models/pizza.glb';
	const models = [
		{
			name: 'cake',
			model: modelCake,
			offset: 0.12,
			scale: 1,
		},
		{
			name: 'cakeBirthday',
			model: modelCakeBirthday,
			offset: 0.09,
			scale: 1,
		},
		{
			name: 'croissant',
			model: modelCroissant,
			offset: 0.15,
			scale: 1.2,
			quaternion: {
				x: 0.1,
				y: 0,
				z: 0,
				w: 1,
			},
		},
		{
			name: 'donutSprinkles',
			model: modelDonutSprinkles,
			offset: 0.15,
			scale: 2,
			quaternion: {
				x: 0.05,
				y: 0,
				z: 0,
				w: 1,
			},
		},

		{
			name: 'loaf',
			model: modelLoaf,
			offset: 0,
			scale: 1,
		},
		{
			name: 'pie',
			model: modelPie,
			offset: 0.175,
			scale: 0.8,
			quaternion: {
				x: -0.1,
				y: 0,
				z: 0,
				w: 1,
			},
		},
		{
			name: 'pizza',
			model: modelPizza,
			offset: 0.25,
			scale: 0.9,
			quaternion: {
				x: -0.1,
				y: 0,
				z: 0,
				w: 1,
			},
		},
	];

	const item = models[Math.floor(Math.random() * models.length)];
	// const item = models.find((item) => item.name === 'loaf');
	const model = useGltf(item.model);

	let width;
	let rotation = 0;
	let rotationSpeed = 0.01;
	// let itemRotationX = item?.quaternion ? item.quaternion.x : 0;
	let itemRotationZ = item?.quaternion ? item.quaternion.z : 0;

	useFrame(() => {
		rotation += rotationSpeed;
	});

	let coords = spring({ x: 0, y: 0 });
	const updateCoords = (e) => {
		coords.set({ x: e.clientX, y: e.clientY });
	};
</script>

<svelte:window bind:innerWidth={width} on:pointermove={updateCoords} />

{#if $model}
	<T.PerspectiveCamera
		makeDefault
		position={[2, 1, -1]}
		on:create={({ ref }) => {
			ref.lookAt(0, 0, 0);
		}}
	/>

	<T
		ref={model}
		is={$model.scene}
		scale={item.scale}
		rotation={[($coords.x - width / 2) / -4000, rotation + $coords.y / 500, itemRotationZ]}
		position={[0, item.offset, 0]}
	/>

	<T.DirectionalLight intensity={0.3} position={[5, 3, -6]} />
	<T.DirectionalLight intensity={0.75} position={[7, 3, -7]} />
	<T.PointLight intensity={2.8} position={[10, 5, -7]} />

	<!-- multiply intensity by Math.PI when moving away from legacyLights -->
{/if}
