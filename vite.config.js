import { sveltekit } from '@sveltejs/kit/vite';
import { threeMinifier } from '@yushijinhun/three-minifier-rollup';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), { ...threeMinifier(), enforce: 'pre' }],
	server: {
		fs: {
			allow: ['..'],
		},
	},
	assetsInclude: ['**/*.glb'],
	ssr: {
		noExternal: ['three'], //, 'troika-three-text'
	},
});
