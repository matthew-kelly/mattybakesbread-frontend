import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';
// import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/kit/vite';
import sequence from 'svelte-sequential-preprocessor';
import { preprocessThrelte } from '@threlte/preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
	},
	preprocess: sequence([
		vitePreprocess(),
		preprocess({
			postcss: true,
		}),
		preprocessThrelte(),
	]),
};

export default config;
