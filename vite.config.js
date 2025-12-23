import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [react(), env.VITE_ESLINT_NO_DEV_ERRORS === 'true' ? null : eslint()].filter(Boolean),

		resolve: {
			dedupe: ['react', 'react-dom'],
		},
	};
});
