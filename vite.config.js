import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // GitHub Pages 部署在 /portfolio/ 子路径下；本地 dev 仍用根路径。
  base: process.env.NODE_ENV === 'production' ? '/portfolio/' : '/',
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  optimizeDeps: {
    // Rapier's dynamic WASM initialization must share one module instance.
    exclude: ['@react-three/rapier'],
    include: ['@react-three/rapier > @dimforge/rapier3d-compat'],
  },
  server: {
    watch: {
      ignored: [
        '**/tmp/**',
        // Clip Studio/Windows can temporarily lock this static asset; do not let that
        // watcher error take down the whole dev server.
        '**/public/assets/profile-cartoon-girl.png',
      ],
    },
  },
});
