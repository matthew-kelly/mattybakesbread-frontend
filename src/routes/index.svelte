<script context="module">
  import { getFeatured } from '$lib/utils/sanity';

  export async function load() {
    const featured = await getFeatured();
    return {
      props: { featured },
    };
  }
</script>

<script>
  import Model3D from '$lib/components/Model3D.svelte';
  import FeaturedCard from '$lib/components/FeaturedCard.svelte';

  // TODO: prerender? will that allow cart to update?
  export const prerender = true;

  export let featured = [];
</script>

<div class="md:mt-8">
  <div class="relative z-10 mt-20 md:mt-0">
    <h1 class="super text-white text-center md:text-left text-shadow-3 md:text-shadow-5 mb-1">Handmade baked goods</h1>
    <p class="font-semibold text-center md:text-left md:text-xl mb-8 md:mb-7 mx-auto max-w-[335px] md:max-w-none">
      Better than your mom used to make, unless your mom was a really good baker.
    </p>
    <div class="flex justify-center md:block mx-4">
      <a class="btn md:large black mr-12 md:mr-16" href="/shop">Shop</a>
      <a class="btn md:large black" href="/content">Content</a>
    </div>

    {#if featured.length}
      <h1 class="text-h3 md:text-h1 text-white text-shadow-3 md:text-shadow-5 mt-12 md:mt-24 mb-4 md:mb-6">
        Featured Product{featured.length > 1 ? 's' : ''}
      </h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 mb-4 md:mb-0">
        {#each featured as card}
          <FeaturedCard {card} />
        {/each}
      </div>
    {/if}
  </div>
</div>

<Model3D item="loaf" />
