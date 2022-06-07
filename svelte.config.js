import adapter from '@sveltejs/adapter-auto';
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    vite: () => ({
      optimizeDeps: {
        esbuildOptions: {
          plugins: [esbuildCommonjs(['@sendgrid'])],
        },
        // exclude: ['path', 'fs', 'os', 'perf_hooks', 'util'],
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
