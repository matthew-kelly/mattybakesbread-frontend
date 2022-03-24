<script>
  import { onMount } from 'svelte';

  import * as SC from 'svelte-cubed';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

  // const models = ['cake', 'cakeBirthday', 'croissant', 'loaf']; // 'donutSprinkles', 'pie', 'pizza'
  // const item = models[Math.floor(Math.random() * models.length)];
  export let item = 'loaf';
  let path = `/models/${item}.glb`;
  let loader = new GLTFLoader();
  let scene;
  onMount(() => {
    loader.load(
      path,
      (gltf) => {
        scene = gltf.scene.children[0];
      },
      (xhr) => {
        console.log('loading...', xhr);
      },
      (error) => {
        // called when loading has errors
        console.error('An error happened', error);
      }
    );
    // TODO: cover site with loading screen until model renders? or placeholder bread image?
  });

  let rotation = 0;
  SC.onFrame(() => {
    rotation += 0.01;
  });
</script>

<div class="canvas-container md:desktop">
  <SC.Canvas antialias alpha>
    <SC.Primitive object={scene} position={[0, 0, 0]} rotation={[0, rotation, 0]} />
    <SC.PerspectiveCamera position={[1, 1, -2]} />
    <SC.DirectionalLight intensity={3} position={[7, 3, -7]} />
  </SC.Canvas>
</div>
