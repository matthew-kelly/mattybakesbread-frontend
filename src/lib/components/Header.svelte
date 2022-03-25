<script>
  import items from '$lib/utils/menuItems';
  import MobileMenuButton from './MobileMenuButton.svelte';
  import MobileMenu from './MobileMenu.svelte';
  import { browser } from '$app/env';

  let isOpen;

  $: if (browser) document.body.classList.toggle('noscroll', isOpen);
</script>

<header class="z-50">
  <nav class="flex justify-between items-center bg-black px-8 py-4 md:p-8 md:bg-inherit">
    <a href="/" class="text-white text-mobile-nav-logo md:text-h2 xl:text-h1 w-20 md:w-auto font-bold mr-14 md:mr-8">
      Matty Bakes Bread
    </a>
    <div class="hidden md:flex justify-between items-center">
      {#each items as item}
        <a href={item.path} class="text-h5 lg:text-h4 text-white font-bold mx-4">{item.title}</a>
      {/each}
      <!-- TODO: live cart count -->
      <a href="/cart" class="text-h5 lg:text-h4 text-white font-bold mx-4">Cart (0)</a>
    </div>
    <MobileMenuButton bind:isOpen />
    {#if isOpen}
      <MobileMenu bind:isOpen />
    {/if}
  </nav>
</header>
