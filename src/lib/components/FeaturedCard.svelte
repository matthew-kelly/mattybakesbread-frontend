<script>
  import { urlFor } from '$lib/utils/sanityImage';
  import { breakpoints } from '$lib/utils/theme';
  import Picture from './Picture.svelte';

  export let card;

  let smallScreen = null;
  let medScreen = null;
  let largeScreen = null;
  if (card.type === 'product') {
    smallScreen = urlFor(card.product.image).width(500).height(500).url();
    medScreen = urlFor(card.product.image).width(380).height(380).url();
    largeScreen = urlFor(card.product.image).width(160).height(160).url();
  }
</script>

<div class="card mb-auto">
  {#if card.type === 'product'}
    <div class="flex flex-col lg:flex-row gap-4 md:items-center md:mb-4">
      <Picture
        width={500}
        height={500}
        alt={card.product.image.alt}
        classes="w-auto lg:max-w-fit aspect-square mx-auto rounded-5"
      >
        <source srcset={smallScreen} media="(max-width: {breakpoints.md}px)" />
        <source srcset={medScreen} media="(max-width: {breakpoints.lg}px)" />
        <source srcset={largeScreen} media="(min-width: {breakpoints.lg + 1}px)" />
      </Picture>
      <p class="text-h4 md:text-h2 font-semibold md:mb-0">{card.product.name}</p>
    </div>
    <p>{card.blurb ? card.blurb : card.product.subtitle}</p>
    <a class="btn md:large self-center justify-self-end" href="/shop/{card.product.slug.current}">Go</a>
  {:else}
    <p class="text-h4 md:text-h2 font-semibold md:mb-4">{card.title}</p>
    <p>{card.blurb}</p>
    <a class="btn md:large self-center justify-self-end" href={card.link}>{card.linkText}</a>
  {/if}
</div>
