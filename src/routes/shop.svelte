<script>
  import ProductCard from '../lib/components/ProductCard.svelte';
</script>

<div>
  <h1 class="text-h3 md:text-h1 md:super text-white text-shadow-3 md:text-shadow-5 mb-2 ml-4 md:ml-8">Shop</h1>
  <p class="font-semibold mb-4 ml-4 md:ml-8">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
  <div class="bg-white p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 shadow-blur rounded-5">
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
  </div>
</div>
