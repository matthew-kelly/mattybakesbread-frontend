import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    vite: () => ({
      optimizeDeps: {
        exclude: ['path', 'fs', 'os', 'perf_hooks', 'util'],
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
