import adapter from '@sveltejs/adapter-auto';
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // experimental: {
  //   prebundleSvelteLibraries: true,
  // },
  kit: {
    adapter: adapter(),
    vite: () => ({
      optimizeDeps: {
        esbuildOptions: {
          plugins: [esbuildCommonjs(['@sendgrid/mail'])],
        },
        exclude: ['path', 'fs', 'os', 'perf_hooks', 'util'],
        // include: ['@sendgrid/mail'],
      },
      server: {
        fs: {
          allow: ['..'],
        },
      },
    }),
  },
};

export default config;
