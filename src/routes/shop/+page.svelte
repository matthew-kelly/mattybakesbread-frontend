<script>
	import ProductCard from '../../lib/components/ProductCard.svelte';

	export let data;
</script>

<div>
	<h1 class="text-h3 md:text-h1 md:super text-white text-shadow-3 md:text-shadow-5 mb-2 ml-4 md:ml-8">Shop</h1>
	<p class="font-semibold mb-4 ml-4 md:ml-8">Buy something already, will ya?</p>
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-5">
		{#if data?.products && data.products.length}
			{#each data.products as product}
				<ProductCard {product} />
			{/each}
		{:else}
			<p>No products found!</p>
		{/if}
	</div>
</div>
