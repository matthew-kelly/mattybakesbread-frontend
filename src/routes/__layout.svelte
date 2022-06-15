<script>
  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/Header.svelte';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import AOS from 'aos';
  import '../styles/app.css';
  import '../styles/aos.css';

  onMount(() => {
    // options: https://github.com/michalsnik/aos#1-initialize-aos
    AOS.init({
      duration: 300,
      // delay: 100,
      easing: 'ease',
      once: true,
    });
  });
</script>

<div class="min-h-screen flex flex-col bg-page-background-lg overflow-x-clip">
  <Header />
  <div class="body">
    <slot />
  </div>
  <Footer />
</div>

<svelte:head>
  <title>{$page.stuff.title ? `${$page.stuff.title} | Matty Bakes Bread` : 'Matty Bakes Bread'}</title>
</svelte:head>

<style>
  /* .bg-page-background {
    background-attachment: fixed;
    background-size: 128px 128px;
  } */
  .bg-page-background-lg {
    background-attachment: fixed;
    background-size: 256px 256px;
  }
</style>
