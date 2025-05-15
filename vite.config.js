import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        tailwindcss(),
    ],
    server:{
        host: '0.0.0.0',
        port: 5173,
        hmr:{
            clientPort: 5173,
            host:'localhost',
            protocol: 'ws'
        },
        cors:{
            origin: '*',
            method: 'GET,PUT,POST,DELETE,UPDATE,HEAD',
            prefliteContinue: false,
            optionsSuccessStatus: 204,
        },
        allowHosts:[
            '127.0.0.1',
            'localhost',
            'node',
            '.local',
        ],
        watch:{
            usePolling: true,
        }
    }
});
