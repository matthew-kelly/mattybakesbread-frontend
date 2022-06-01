<script>
  import { urlFor } from '$lib/utils/sanityImage';
  import 'lazysizes';

  export let card;

  let image = null;
  let tiny = null;
  if (card.type === 'image') {
    image = urlFor(card.image).width(500).height(500).url();
    tiny = urlFor(card.image).width(50).height(50).url();
  }
</script>

{#if image}
  <a href={card.link} target="_blank">
    <img
      data-src={image}
      src={tiny}
      alt={card.image.alt}
      class="w-full aspect-square lazyload mx-auto rounded-5 shadow-blur"
    />
  </a>
{:else}
  <div class="card">
    <div class="flex flex-col md:items-center grow">
      <p class="text-h4 font-semibold">{card.title}</p>
      <p class="">{card.description}</p>
    </div>
    {#if card.link}
      <a class="btn md:large self-center justify-self-end" href={card.link}>{card.linkText ?? 'Go'}</a>
    {/if}
  </div>
{/if}
