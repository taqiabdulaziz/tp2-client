// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';
// eslint-disable-next-line import/no-extraneous-dependencies
import react from '@vitejs/plugin-react';

const isProd = process.env.NODE_ENV === 'prod';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  ...(!isProd && {
    server: {
      proxy: {
        '/api': {
          target: 'https://dev.api.toel.app/user',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }),
});
