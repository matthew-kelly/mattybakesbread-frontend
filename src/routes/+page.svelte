<script>
	import FeaturedCard from '$lib/components/FeaturedCard.svelte';
	import ModelScene from '../lib/components/ModelScene.svelte';

	export let data;
</script>

<div class="md:mt-8">
	<div class="relative z-10 mt-20 md:mt-0">
		<h1 class="super text-white text-center md:text-left text-shadow-3 md:text-shadow-5 mb-1">Handmade baked goods</h1>
		<p class="font-semibold text-center md:text-left md:text-xl mb-8 md:mb-7 mx-auto max-w-[335px] md:max-w-none">
			Better than your mom used to make, unless your mom was a really good baker.
		</p>
		<div class="flex justify-center md:block mx-4">
			<a class="btn md:large black mr-12 md:mr-16" href="/shop">Shop</a>
			<a class="btn md:large black" href="/content">Content</a>
		</div>

		{#if data.featured.length}
			<!-- <h1 class="text-h3 md:text-h1 text-white text-shadow-3 md:text-shadow-5 mt-12 md:mt-24 mb-4 md:mb-6">
				Featured Product{data.featured.length > 1 ? 's' : ''}
			</h1> -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 mt-12 mb-4 md:mb-0">
				{#each data.featured as card}
					<FeaturedCard {card} />
				{/each}
			</div>
		{/if}
	</div>
</div>

<ModelScene />
