<script>
	import { onMount } from 'svelte';
	import LogoInitials from './LogoInitials.svelte';

	let os;
	let width;

	const getMobileOS = () => {
		const ua = navigator.userAgent;
		if (/android/i.test(ua)) {
			return 'Android';
		} else if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
			return 'iOS';
		}
		return 'Other';
	};

	onMount(() => {
		os = getMobileOS();
	});
</script>

<svelte:window bind:innerWidth={width} />

<footer class="relative flex flex-col items-center p-4 md:py-8 md:px-16 bg-white">
	<div class="flex justify-between items-center w-full mb-4 md:mb-1 {os === 'iOS' ? 'pb-8' : ''}">
		<a href="/">
			<LogoInitials height={width > 768 ? 96 : 64} />
		</a>
		<div class="flex justify-between font-display">
			<a class="mx-2 md:mx-6 font-normal" href="/shop">Shop</a>
			<a class="mx-2 md:mx-6 font-normal" href="/content">Content</a>
			<a class="mx-2 md:ml-6 font-normal" href="/orders">Orders</a>
		</div>
	</div>
	<span
		class="absolute md:relative {os === 'iOS'
			? 'bottom-8'
			: 'bottom-2'}  md:bottom-auto md:right-auto text-xs md:text-base text-right md:text-center"
	>
		👨‍💻 & 🍞🥖🥐 by
		<a href="https://github.com/matthew-kelly" target="_blank" rel="noreferrer"> Matty </a>
		<!-- FIXME: restore link to personal site -->
		<!-- <a href="https://matthewkelly.ca" target="_blank" rel="external"> Matty </a> -->
	</span>
</footer>
