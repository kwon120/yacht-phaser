import { defineConfig } from 'vite'

export default defineConfig({
	base: '/yacht-phaser/',
	plugins: [],
	server: { host: '0.0.0.0', port: 8000 },
	clearScreen: false,
})
