<script>
  import { urlFor } from '$lib/utils/sanityImage';
  import 'lazysizes';

  export let card;

  const url = urlFor(card.product.image).width(400).height(400).url();
</script>

<div class="card mb-auto">
  <div class="flex flex-col lg:flex-row gap-4 md:items-center md:mb-4">
    <img
      data-src={url}
      alt={card.product.image.alt}
      class="w-full aspect-square lazyload max-w-fit mx-auto rounded-5"
    />
    <p class="text-h4 md:text-h2 font-semibold md:mb-0">{card.product.name}</p>
  </div>
  <p>{card.blurb ? card.blurb : card.product.subtitle}</p>
  <a class="btn md:large self-center justify-self-end" href="/shop/{card.product.slug.current}">Go</a>
</div>
