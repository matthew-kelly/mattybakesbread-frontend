<script>
  import { onMount } from 'svelte';
  import * as SC from 'svelte-cubed';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

  let isLoading = true;

  const models = [
    {
      name: 'cakeBirthday',
      offset: 0.075,
      scale: 1,
    },
    {
      name: 'cake',
      offset: 0.08,
      scale: 1,
    },
    {
      name: 'pie',
      offset: 0.15,
      scale: 0.8,
      quaternion: {
        x: 0.1,
        y: 0,
        z: 0,
        w: 1,
      },
    },
    {
      name: 'pizza',
      offset: 0.2,
      scale: 0.8,
      quaternion: {
        x: 0.1,
        y: 0,
        z: 0,
        w: 1,
      },
    },
    {
      name: 'donutSprinkles',
      offset: 0.1,
      scale: 2,
      quaternion: {
        x: 0.05,
        y: 0,
        z: 0,
        w: 1,
      },
    },
    {
      name: 'croissant',
      offset: 0.11,
      scale: 1,
      quaternion: {
        x: 0.1,
        y: 0,
        z: 0,
        w: 1,
      },
    },
    {
      name: 'loaf',
      offset: 0,
      scale: 1,
    },
  ];
  const item = models[Math.floor(Math.random() * models.length)];
  let path = `/models/${item.name}.glb`;
  let loader = new GLTFLoader();
  let scene;
  onMount(() => {
    loader.load(
      path,
      (gltf) => {
        scene = gltf.scene.children[0];
        scene.scale.x = scene.scale.y = scene.scale.z = item.scale;
        if (item.quaternion) {
          scene.quaternion._x = item.quaternion.x;
          scene.quaternion._y = item.quaternion.y;
          scene.quaternion._z = item.quaternion.z;
          scene.quaternion._w = item.quaternion.w;
        }
      },
      (xhr) => {
        console.log('loading...', xhr);
        isLoading = false;
      },
      (error) => {
        // called when loading has errors
        console.error('An error happened', error);
      }
    );
  });

  let rotation = 0;
  SC.onFrame(() => {
    rotation += 0.01;
  });
</script>

<div class="canvas-container md:desktop transition-opacity duration-300 {isLoading ? 'opacity-0' : 'opacity-100'}">
  <SC.Canvas antialias alpha>
    <SC.Primitive object={scene} position={[0, item.offset, 0]} rotation={[0, rotation, 0]} />
    <SC.PerspectiveCamera position={[1, 1, -2]} />
    <SC.DirectionalLight intensity={0.3} position={[5, 3, -6]} />
    <SC.DirectionalLight intensity={2.5} position={[7, 3, -7]} />
    <SC.SpotLight intensity={0.75} position={[10, 5, -7]} />
  </SC.Canvas>
</div>
