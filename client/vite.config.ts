import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        base: 'http://localhost:3000/',
        host: 'localhost',
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:5000/',
                changeOrigin: true,
            },
        },
    },
    resolve: {
        alias: { '@': path.resolve(__dirname, './src/') },
    },

    plugins: [
        react(),
        svgrPlugin({
            svgrOptions: {
                icon: true,
            },
        }),
    ],
});
