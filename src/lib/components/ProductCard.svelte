<script>
  import { urlFor } from '$lib/utils/sanityImage';
  import formatMoney from '$lib/helpers/formatMoney';
  import 'lazysizes';

  export let product;

  $: disabled = product.stock === 0;

  const lowQuality = urlFor(product.image).width(50).height(50).url();
  const url = urlFor(product.image).width(400).height(400).url();
</script>

<div class="card w-full p-0 flex flex-col {disabled ? 'opacity-60' : ''}">
  <a href="/shop/{product.slug.current}" class="contents">
    <img data-src={url} src={lowQuality} alt={product.image.alt} class="w-full aspect-square lazyload rounded-5" />
    <div class="flex justify-between items-center p-4 flex-grow">
      <p class="font-semibold m-0 mr-4 w-full text-center">{product.name}</p>
      <a class="btn {disabled ? 'disabled px-3 whitespace-nowrap' : ''}" href="/shop/{product.slug.current}">
        {disabled ? 'Sold out' : formatMoney(product.price)}
      </a>
    </div>
  </a>
</div>
