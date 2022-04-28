<script>
  import { urlFor } from '$lib/utils/sanityImage';
  import formatMoney from '$lib/helpers/formatMoney';

  export let product;

  const url = urlFor(product.image).width(400).height(400).url();
</script>

<div class="card w-full p-0 flex flex-col">
  <a href={`/shop/${product.slug.current}`}>
    <img src={url} alt={product.image.alt} class="w-full" />
    <div class="flex justify-between items-center p-4 flex-grow">
      <p class="font-semibold m-0 mr-4 w-full text-center">{product.name}</p>
      <a class="btn" href="/shop/900g-sourdough-batard">{formatMoney(product.price)}</a>
    </div>
  </a>
</div>
