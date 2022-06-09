<script>
  import { urlFor } from '$lib/utils/sanityImage';
  import { breakpoints } from '$lib/utils/theme';
  import Picture from './Picture.svelte';
  import 'lazysizes';

  export let card;

  let smallScreen = null;
  let largeScreen = null;
  if (card.type === 'image') {
    smallScreen = urlFor(card.image).width(500).height(500).url();
    largeScreen = urlFor(card.image).width(350).height(350).url();
  }
</script>

{#if smallScreen && largeScreen}
  <a href={card.link} target="_blank">
    <Picture
      width={500}
      height={500}
      alt={card.title}
      classes="w-full aspect-square lazyload mx-auto rounded-5 shadow-blur hover:shadow-blur-lg transition-shadow"
    >
      <source data-srcset={smallScreen} media="(max-width: {breakpoints.sm}px)" />
      <source data-srcset={largeScreen} media="(min-width: {breakpoints.sm + 1}px)" />
    </Picture>
  </a>
{:else}
  <div class="card">
    <div class="flex flex-col md:items-center grow">
      <p class="text-h4 md:text-h5 lg:text-h4 font-semibold mb-4 md:mb-2 lg:mb-4">{card.title}</p>
      <p class="mb-4 md:mb-2 lg:mb-4">{card.description}</p>
    </div>
    {#if card.link}
      <a class="btn lg:large self-center justify-self-end" href={card.link}>{card.linkText ?? 'Go'}</a>
    {/if}
  </div>
{/if}
