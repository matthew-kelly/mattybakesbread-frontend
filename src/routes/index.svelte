<script>
  import Model3D from '../lib/Model3D.svelte';

  export const prerender = true;
  // TODO: prerender? will that allow cart to update?
</script>

<div class="relative z-10 mt-20 md:mt-0">
  <h1 class="super text-white text-center md:text-left text-shadow-3 md:text-shadow-5 mb-1">
    Handmade baked goods
  </h1>
  <p class="font-semibold text-center md:text-left md:text-xl mb-8 md:mb-7">
    Better than your mom used to make, unless your mom was a really good baker.
  </p>
  <!-- TODO: decide whether to have buttons or not. Currently same content as cards. -->
  <div class="flex justify-center md:block mx-4">
    <a class="btn md:large black mr-12 md:mr-16" href="/shop">Shop</a>
    <a class="btn md:large black" href="/content">Content</a>
  </div>

  <div
    class="flex md:justify-between items-center md:items-start flex-col md:flex-row mt-16 md:mt-32 mb-4 md:mb-0"
  >
    <div class="card mb-8 md:mb-0 md:mr-16">
      <p class="text-h3 md:text-h2 font-semibold">Shop</p>
      <p>Take a look at what's fresh from the oven.</p>
      <a class="btn md:large" href="/shop">Go</a>
    </div>
    <div class="card">
      <p class="text-h3 md:text-h2 font-semibold">Content</p>
      <p>
        Find out if I've posted another poorly lit picture of a loaf of bread to my Instagram
        account.
      </p>
      <a class="btn md:large" href="/content">Go</a>
    </div>
  </div>
</div>

<!-- TODO: 3D bread -->
<Model3D item="loaf" />
