import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom', // This allows simulating a browser environment for React components
    css: true,
    setupFiles: './src/setupTests.js', // Optional: This is where you’ll configure any test setup
  },
});
