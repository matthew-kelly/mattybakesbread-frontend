<script context="module">
  import client from '$lib/utils/sanity';

  export async function load({ url, params, props, fetch, session, stuff }) {
    try {
      const product = await client.fetch(`*[_type == "product" && slug.current == "${params.slug}"][0]`);
      return {
        props: {
          product,
        },
        stuff: { title: product.name },
      };
    } catch (e) {
      return {
        error: 'Product not found',
        status: 404,
      };
    }
  }
</script>

<script>
  import { urlFor } from '$lib/utils/sanityImage';
  import formatMoney from '$lib/helpers/formatMoney';

  export let product;
  const url = urlFor(product.image).width(928).height(500).fit('max').url();

  // TODO: add to cart
  function addToCart() {
    console.log(product);
  }
</script>

<div>
  <h1 class="text-h3 md:text-h1 md:super text-white text-shadow-3 md:text-shadow-5 mb-2 ml-4 md:ml-8">
    {product.name}
  </h1>
  <p class="font-semibold mb-4 ml-4 md:ml-8">
    {product.subtitle}
  </p>
  <div class="flex flex-col bg-white p-4 rounded-5 shadow-blur">
    <img src={url} alt={product.image.alt} />
    {#if product.description}
      <p class="font-semibold my-4">{product.description}</p>
    {/if}
    <div class="flex justify-between items-center mt-4">
      <!-- TODO: disable add to cart if stock is 0 -->
      <p class="font-semibold m-0 mr-4">In Stock: {product.stock}</p>
      {#if product.stock === 0}
        <button class="btn black disabled" type="button" disabled>Out of stock</button>
      {:else}
        <button class="btn" type="button" on:click={addToCart}>Add to cart - {formatMoney(product.price)}</button>
      {/if}
    </div>
  </div>
</div>
