<script>
  import { urlFor } from '$lib/utils/sanityImage';
  import formatMoney from '$lib/helpers/formatMoney';
  import { breakpoints } from '$lib/utils/theme';
  import Picture from './Picture.svelte';
  import 'lazysizes';

  export let product;

  $: disabled = product.stock === 0;

  let smallScreen = urlFor(product.image).width(500).height(500).url();
  let largeScreen = urlFor(product.image).width(350).height(350).url();
</script>

<div class="card w-full p-0 flex flex-col" data-aos="fade-up">
  <a href="/shop/{product.slug.current}" class="contents">
    <Picture width={500} height={500} alt={product.image.alt} classes="w-full aspect-square lazyload rounded-t-5">
      <source data-srcset={smallScreen} media="(max-width: {breakpoints.sm}px)" />
      <source data-srcset={largeScreen} media="(min-width: {breakpoints.sm + 1}px)" />
    </Picture>
    <div class="flex justify-between items-center p-4 flex-grow">
      <p class="font-semibold m-0 mr-4 w-full text-center">{product.name}</p>
      <a href="/shop/{product.slug.current}">
        <button class="btn {disabled ? 'black whitespace-nowrap px-3' : ''}" {disabled}>
          {disabled ? 'Sold out' : formatMoney(product.price)}
        </button>
      </a>
    </div>
  </a>
</div>
