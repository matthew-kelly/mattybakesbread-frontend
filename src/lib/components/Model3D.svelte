<script>
	import { spring } from 'svelte/motion';
	import { OrbitControls, T, useFrame } from '@threlte/core';
	import { GLTF } from '@threlte/extras';
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
		// {
		// 	name: 'croissant',
		// 	model: modelCroissant,
		// 	offset: 0.15,
		// 	scale: 1.2,
		// 	quaternion: {
		// 		x: 0.1,
		// 		y: 0,
		// 		z: 0,
		// 		w: 1,
		// 	},
		// },
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

	let gltfRef;
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

<!-- // FIXME: check how this works on real mobile device, can switch to mousemove if need to disable on mobile -->
<svelte:window bind:innerWidth={width} on:pointermove={updateCoords} />

<GLTF
	bind:gltfRef
	url={item.model}
	scale={item.scale}
	rotation={{
		x: ($coords.x - width / 2) / -4000,
		y: rotation + $coords.y / 500,
		z: itemRotationZ,
	}}
	position={{ y: item.offset }}
/>

<T.PerspectiveCamera makeDefault position={[2, 1, -1]} fov={50}>
	<OrbitControls target={gltfRef} enabled={false} />
</T.PerspectiveCamera>

<T.DirectionalLight intensity={0.3} position={[5, 3, -6]} />
<T.DirectionalLight intensity={0.75} position={[7, 3, -7]} />
<T.PointLight intensity={2.8} position={[10, 5, -7]} />
