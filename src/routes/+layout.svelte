<script>
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	// import '@fontsource/work-sans/variable.css';
	import AOS from 'aos';
	import '../styles/app.css';
	import '../styles/aos.css';
	import bgImageLg from '$lib/assets/mattybakesbread_background_large.svg';

	onMount(() => {
		// TODO: get rid of AOS?
		// options: https://github.com/michalsnik/aos#1-initialize-aos
		AOS.init({
			duration: 300,
			// delay: 100,
			easing: 'ease',
			once: true,
		});
	});
</script>

<div
	class="min-h-screen flex flex-col bg-page-background-lg overflow-x-clip"
	style="background-image: url({bgImageLg})"
>
	<Header />
	<main class="body">
		<slot />
	</main>
	<Footer />
</div>

<svelte:head>
	<title>{$page.data.title ? `${$page.data.title} | Matty Bakes Bread` : 'Matty Bakes Bread'}</title>
	{#if $page.data.description}
		<meta name="description" content={$page.data.description} />
	{:else}
		<meta
			name="description"
			content="An online bakery by Matty. Serving fresh sourdough bread and other baked goods to Vancouver and the Sunshine Coast since 2020."
		/>
	{/if}
	{#if $page.data.structuredData}
		{@html `<script key="structured-data" type="application/ld+json">${JSON.stringify(
			$page.data.structuredData
		)}</script>`}
	{/if}
</svelte:head>

<style>
	/* .bg-page-background {
    background-attachment: fixed;
    background-size: 128px 128px;
  } */
	.bg-page-background-lg {
		background-attachment: fixed;
		background-size: 256px 256px;
	}
</style>
