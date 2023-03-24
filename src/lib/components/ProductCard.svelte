<script>
	import { urlFor } from '$lib/utils/sanityImage';
	import formatMoney from '$lib/helpers/formatMoney';
	import { breakpoints } from '$lib/utils/theme';
	import Picture from './Picture.svelte';
	import { reducedMotion } from '$lib/utils/reducedMotion';
	import 'lazysizes';

	export let product;

	$: disabled = product.stock === 0;

	let smallScreen = urlFor(product.image).width(500).height(500).url();
	let largeScreen = urlFor(product.image).width(350).height(350).url();

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
		cardRef.style.transform = `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
	};
</script>

<div
	class="card w-full p-0 flex flex-col"
	data-aos="fade-up"
	bind:this={cardRef}
	on:mousemove={handleHover}
	on:mouseleave={resetStyles}
>
	<a href="/shop/{product.slug.current}" class="contents">
		<Picture width={500} height={500} alt={product.image.alt} classes="w-full aspect-square lazyload rounded-t-5">
			<source data-srcset={smallScreen} media="(max-width: {breakpoints.sm}px)" />
			<source data-srcset={largeScreen} media="(min-width: {breakpoints.sm + 1}px)" />
		</Picture>
		<div class="flex justify-between items-center p-4 flex-grow card-content">
			<p class="font-normal font-display m-0 mr-4 w-full text-center">{product.name}</p>
			<a href="/shop/{product.slug.current}">
				<button class="btn {disabled ? 'black whitespace-nowrap px-3' : ''}" {disabled}>
					{disabled ? 'Sold out' : formatMoney(product.price)}
				</button>
			</a>
		</div>
	</a>
</div>

<style>
	.card {
		transition: transform 0.01s ease;
		transform-style: preserve-3d;
		will-change: transform;
	}
</style>
