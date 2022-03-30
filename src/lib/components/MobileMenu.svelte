<script>
  import items from '$lib/utils/menuItems';
  import { fly } from 'svelte/transition';
  import { page } from '$app/stores';
  import { beforeNavigate } from '$app/navigation';

  export let isOpen = false;

  beforeNavigate((navigation) => {
    isOpen = false;
  });
</script>

{#if isOpen}
  <nav transition:fly={{ x: -500 }} class="absolute z-40 inset-0 top-[80px] w-full h-screen bg-black p-8 flex flex-col">
    <a href="/" class="{$page.url.pathname === '/' ? 'disabled' : ''} font-semibold text-h3 text-white mb-6">Home</a>
    {#each items as item}
      <a
        href={item.path}
        class="{$page.url.pathname === item.path ? 'disabled' : ''} font-semibold text-h3 text-white mb-6"
      >
        {item.title}
      </a>
    {/each}
    <!-- TODO: live cart value -->
    <a href="/cart" class="{$page.url.pathname === '/cart' ? 'disabled' : ''} font-semibold text-h3 text-white mb-6">
      Cart
    </a>
  </nav>
{/if}
