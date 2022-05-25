<script context="module">
  import { getProduct } from '$lib/utils/sanity';

  export async function load({ url, params, props, fetch, session, stuff }) {
    try {
      const product = await getProduct({ slug: params.slug });
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
  import { cart, addToCart } from '$lib/utils/cart';
  import formatMoney from '$lib/helpers/formatMoney';
  import Spinner from '$lib/components/Spinner.svelte';
  import 'lazysizes';

  export let product;
  let isLoading = false;
  const lowQuality = urlFor(product.image).width(112).height(63).fit('max').url();
  const url = urlFor(product.image).width(928).height(522).fit('max').url();

  $: cartQuantity = $cart.contents.find((item) => item._id === product._id)?.quantity;

  function handleClick() {
    if (isLoading || product.stock === 0) return null; // prevent additional clicks till loading is done
    isLoading = true;

    setTimeout(() => {
      addToCart(product);
      isLoading = false;
    }, 700);
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
    <img data-src={url} src={lowQuality} alt={product.image.alt} class="aspect-video lazyload rounded-5" />
    {#if product.description}
      <p class="font-semibold my-4">{product.description}</p>
    {/if}
    <div class="flex justify-between items-center mt-4">
      <p class="font-semibold m-0 mr-4">In Stock: {product.stock}</p>
      {#if isLoading}
        <button class="btn flex justify-between items-center" type="button">
          <Spinner />
          Adding...
        </button>
      {:else if product.stock === 0}
        <button class="btn black disabled" type="button" disabled>Out of stock</button>
      {:else if cartQuantity && product.stock <= cartQuantity}
        <button class="btn disabled" type="button" disabled>Limit reached</button>
      {:else}
        <button class="btn flex justify-between items-center" type="button" on:click={handleClick}>
          Add to cart - {formatMoney(product.price)}
        </button>
      {/if}
    </div>
  </div>
</div>
