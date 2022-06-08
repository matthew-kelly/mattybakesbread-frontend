// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    vite: () => ({
      server: {
        fs: {
          allow: ['..'],
        },
      },
    }),
  },
};

export default config;
