<script>
	import { urlFor } from '$lib/utils/sanityImage';
	import { cart, addToCart } from '$lib/utils/cart';
	import formatMoney from '$lib/helpers/formatMoney';
	import Spinner from '$lib/components/Spinner.svelte';
	import Picture from '$lib/components/Picture.svelte';
	import { breakpoints } from '$lib/utils/theme';

	export let data;
	const product = data.product;
	const display = product.image?.display;
	let isLoading = false;

	let dimensions = {
		small: {
			width: 600,
			height: 600,
		},
		large: {
			width: 928,
			height: 522,
		},
	};

	switch (display) {
		case 'vertical':
			dimensions.small = { width: 600, height: 800 };
			dimensions.large = { width: 600, height: 800 };
			break;
		case 'horizontal':
			dimensions.large = { width: 928, height: 522 };
			break;
		case 'square':
			dimensions.large = { width: 600, height: 600 };
			break;
		default:
			break;
	}

	let smallScreen = urlFor(product.image).width(dimensions.small.width).height(dimensions.small.height).url();
	let largeScreen = urlFor(product.image)
		.width(dimensions.large.width)
		.height(dimensions.large.height)
		.fit('max')
		.url();

	$: cartQuantity = $cart.contents.find((item) => item._id === product._id)?.quantity;

	function handleClick() {
		if (isLoading || product.stock === 0) return null; // prevent additional clicks till loading is done
		isLoading = true;

		setTimeout(() => {
			addToCart(product);
			isLoading = false;
		}, 700);
	}
</script>

<div>
	<h1 class="text-h3 md:text-h1 md:super text-white text-shadow-3 md:text-shadow-5 mb-2 ml-4 md:ml-8">
		{product.name}
	</h1>
	<p class="font-semibold mb-4 ml-4 md:ml-8 text-h6">
		{product.subtitle}
	</p>
	<div class="flex {display === 'horizontal' ? '' : 'md:flex-row'} flex-col gap-4 bg-white p-4 rounded-5 shadow-blur">
		<Picture
			width={dimensions.small.width}
			height={dimensions.small.height}
			alt={product.image.alt}
			classesPicture="w-full {display === 'horizontal' ? 'md:aspect-video' : 'md:min-w-[50%] flex flex-col'}"
			classes="w-full rounded-5"
		>
			<source srcset={smallScreen} media="(max-width: {breakpoints.md - 1}px)" />
			<source srcset={largeScreen} media="(min-width: {breakpoints.md}px)" />
		</Picture>
		<div class="flex flex-col gap-4">
			{#if product.description}
				<p class="mb-0">{product.description}</p>
			{/if}
			<div class="flex justify-between items-center">
				<p class="font-semibold m-0 mr-4">In Stock: {product.stock}</p>
				{#if isLoading}
					<button class="btn flex justify-between items-center" type="button">
						<Spinner />
						Adding...
					</button>
				{:else if product.stock === 0}
					<button class="btn black disabled" type="button" disabled>Out of stock</button>
				{:else if cartQuantity && product.stock <= cartQuantity}
					<button class="btn disabled" type="button" disabled>Limit reached</button>
				{:else}
					<button class="btn flex justify-between items-center" type="button" on:click={handleClick}>
						Add to cart - {formatMoney(product.price)}
					</button>
				{/if}
			</div>
		</div>
	</div>
</div>
