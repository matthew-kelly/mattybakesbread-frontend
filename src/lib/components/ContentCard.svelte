<script>
	import { urlFor } from '$lib/utils/sanityImage';
	import { breakpoints } from '$lib/utils/theme';
	import Picture from './Picture.svelte';
	import { reducedMotion } from '$lib/utils/reducedMotion';
	import 'lazysizes';

	export let card;

	let smallScreen = null;
	let largeScreen = null;
	if (card.type === 'image') {
		smallScreen = urlFor(card.image).width(500).height(500).url();
		largeScreen = urlFor(card.image).width(350).height(350).url();
	}

	let cardRef;
	const THRESHOLD = 3;
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

{#if smallScreen && largeScreen}
	<a
		href={card.link}
		target="_blank"
		rel="noreferrer"
		data-aos="fade-up"
		bind:this={cardRef}
		on:mousemove={handleHover}
		on:mouseleave={resetStyles}
	>
		<Picture
			width={500}
			height={500}
			alt={card.title}
			classes="w-full aspect-square lazyload mx-auto rounded-5 shadow-blur hover:shadow-blur-lg transition-shadow"
		>
			<source data-srcset={smallScreen} media="(max-width: {breakpoints.sm}px)" />
			<source data-srcset={largeScreen} media="(min-width: {breakpoints.sm + 1}px)" />
		</Picture>
	</a>
{:else}
	<div class="card" data-aos="fade-up" bind:this={cardRef} on:mousemove={handleHover} on:mouseleave={resetStyles}>
		<div class="flex flex-col md:items-center grow">
			<p class="text-h4 md:text-h5 lg:text-h4 font-display font-semibold mb-4 md:mb-2 lg:mb-4">{card.title}</p>
			<p class="mb-4 md:mb-2 lg:mb-4">{card.description}</p>
		</div>
		{#if card.link}
			<a class="btn lg:large self-center justify-self-end" href={card.link}>{card.linkText ?? 'Go'}</a>
		{/if}
	</div>
{/if}
