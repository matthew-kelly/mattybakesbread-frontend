<script context="module">
  import { getProducts } from '$lib/utils/sanity';

  export async function load() {
    const data = await getProducts();
    return {
      props: { products: data },
      stuff: { title: 'Shop' },
    };
  }
</script>

<script>
  import ProductCard from '../lib/components/ProductCard.svelte';

  export let products;
</script>

<div>
  <h1 class="text-h3 md:text-h1 md:super text-white text-shadow-3 md:text-shadow-5 mb-2 ml-4 md:ml-8">Shop</h1>
  <p class="font-semibold mb-4 ml-4 md:ml-8">Buy something already, will ya?</p>
  <div class="bg-white p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 shadow-blur rounded-5">
    {#if products && products.length}
      {#each products as product}
        <ProductCard {product} />
      {/each}
    {:else}
      <p>No products found!</p>
    {/if}
  </div>
</div>
