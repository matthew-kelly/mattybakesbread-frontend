<script>
  import formatMoney from '$lib/helpers/formatMoney';

  export let product = {
    // TODO: get product from props, no default
    name: '900g Sourdough Batard',
    slug: '900g-sourdough-batard',
    price: 1000,
  };
</script>

<div class="card w-full p-0 flex flex-col">
  <a href={`/shop/${product.slug}`}>
    <!-- TODO: display proper image -->
    <div class="relative w-full h-0 pt-[100%] bg-gray-400" />
    <!-- end temp image -->
    <div class="flex justify-between items-center p-4 flex-grow">
      <p class="font-semibold m-0 mr-4 w-full text-center">{product.name}</p>
      <a class="btn" href="/shop/900g-sourdough-batard">{formatMoney(product.price)}</a>
    </div>
  </a>
</div>
