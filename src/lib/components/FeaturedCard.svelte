<script>
	import { urlFor } from '$lib/utils/sanityImage';
	import { breakpoints } from '$lib/utils/theme';
	import Picture from './Picture.svelte';
	import { reducedMotion } from '$lib/utils/reducedMotion';

	export let card;

	let smallScreen = null;
	let medScreen = null;
	let largeScreen = null;
	if (card.type === 'product') {
		smallScreen = urlFor(card.product.image).width(500).height(500).url();
		medScreen = urlFor(card.product.image).width(380).height(380).url();
		largeScreen = urlFor(card.product.image).width(160).height(160).url();
	}

	let cardRef;
	const THRESHOLD = 2;
	const handleHover = (e) => {
		if ($reducedMotion) return;

		const { clientX, clientY, currentTarget } = e;
		const rect = currentTarget.getBoundingClientRect();
		// Mouse position (from 0 to 1)
		const horiz = (clientX - rect.left) / rect.width;
		const vert = (clientY - rect.top) / rect.height;
		// rotation degrees
		const rotateX = (THRESHOLD / 2 - horiz * THRESHOLD).toFixed(2);
		const rotateY = (vert * THRESHOLD - THRESHOLD / 2).toFixed(2);

		cardRef.style.transform = `perspective(${currentTarget.clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1, 1, 1)`;
	};

	const resetStyles = (e) => {
		if ($reducedMotion) return;
		cardRef.style.transform = `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
	};
</script>

<div class="card mb-auto" bind:this={cardRef} on:mousemove={handleHover} on:mouseleave={resetStyles}>
	{#if card.type === 'product'}
		<div class="flex flex-col md:flex-row gap-4 md:items-center md:mb-4">
			<div class="grow w-full">
				<Picture width={500} height={500} alt={card.product.image.alt} classes="aspect-square rounded-5 w-auto mx-auto">
					<source srcset={smallScreen} media="(max-width: {breakpoints.md}px)" />
					<source srcset={medScreen} media="(max-width: {breakpoints.lg}px)" />
					<source srcset={largeScreen} media="(min-width: {breakpoints.lg + 1}px)" />
				</Picture>
			</div>
			<p class="font-display text-h4 md:text-h3 md:mb-0">{card.product.name}</p>
		</div>
		<p>{card.blurb ? card.blurb : card.product.subtitle}</p>
		<a class="btn md:large self-center justify-self-end" href="/shop/{card.product.slug.current}">Go</a>
	{:else}
		<p class="text-h4 md:text-h3 font-display md:mb-4">{card.title}</p>
		<p>{card.blurb}</p>
		<a class="btn md:large self-center justify-self-end" href={card.link}>{card.linkText}</a>
	{/if}
</div>
