<script>
  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/Header.svelte';
  import '../app.css';
</script>

<div class="min-h-screen flex flex-col bg-page-background">
  <Header />
  <div class="body">
    <slot />
  </div>
  <Footer />
</div>

<style>
  .bg-page-background {
    background-attachment: fixed;
    background-size: 128px 128px;
  }
</style>
