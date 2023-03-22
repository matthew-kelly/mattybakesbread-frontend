<script>
	import items from '$lib/utils/menuItems';
	import MobileMenuButton from './MobileMenuButton.svelte';
	import MobileMenu from './MobileMenu.svelte';
	import CartCount from './CartCount.svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import MobileCartButton from './MobileCartButton.svelte';
	import Logo from './Logo.svelte';

	let isOpen;
	let width;

	$: if (browser) document.body.classList.toggle('noscroll', isOpen);
</script>

<svelte:window bind:innerWidth={width} />

<header class="z-50">
	<nav class="flex justify-between items-center bg-black px-4 py-2 md:py-2 md:px-4 md:bg-inherit md:whitespace-nowrap">
		<a
			href="/"
			class="text-white text-mobile-nav-logo md:text-h2 md:text-shadow-3 lg:text-h1 w-20 md:w-auto font-bold mr-14 md:mr-4"
		>
			<Logo height={width > 768 ? 96 : 64} fill="white" shadow={width > 768 ? true : false} />
		</a>
		<div class="hidden md:flex justify-between items-center">
			{#each items as item}
				<a
					href={item.path}
					class="{$page.url.pathname === item.path
						? 'disabled'
						: 'md:text-shadow-2'} text-h6 lg:text-h4 text-white font-bold mx-2 lg:mx-4">{item.title}</a
				>
			{/each}
			<a
				href="/cart"
				class="{$page.url.pathname === '/cart'
					? 'disabled'
					: 'md:text-shadow-2'} text-h6 lg:text-h4 text-white font-bold mx-2 lg:mx-4 md:mr-0">Cart (<CartCount />)</a
			>
		</div>

		<div class="md:hidden flex gap-7 items-center">
			<MobileCartButton />
			<MobileMenuButton bind:isOpen />
		</div>
		{#if isOpen}
			<MobileMenu bind:isOpen />
		{/if}
	</nav>
</header>

<style>
	a.disabled {
		@apply text-secondary-light translate-y-px;
	}
</style>
