<script>
  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/Header.svelte';
  import { page } from '$app/stores';
  import '../app.css';
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
  .bg-page-background {
    background-attachment: fixed;
    background-size: 128px 128px;
  }
  .bg-page-background-lg {
    background-attachment: fixed;
    background-size: 256px 256px;
  }
</style>
