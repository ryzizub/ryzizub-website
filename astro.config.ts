import { fileURLToPath } from 'node:url';
import { defineConfig, fontProviders } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import config from './src/site.config';

// https://astro.build/config
export default defineConfig({
	site: config.site.url,
	output: 'static',
	trailingSlash: 'never',
	// A monospace for everything command-like (the palette, labels, dates) and a
	// plain humanist sans for the rest.
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'JetBrains Mono',
			cssVariable: '--font-mono',
			weights: [400, 500, 700, 800],
			styles: ['normal'],
			subsets: ['latin', 'latin-ext'],
		},
		{
			provider: fontProviders.google(),
			name: 'IBM Plex Sans',
			cssVariable: '--font-sans',
			weights: [400, 500, 600],
			styles: ['normal'],
			subsets: ['latin', 'latin-ext'],
		},
	],
	integrations: [react(), sitemap()],
	vite: {
		// Vite 8 discovers tsconfig.json by walking up the tree and can land on a
		// parent checkout's file when this repo is a git worktree nested inside
		// another (Claude Code keeps them under .claude/worktrees/). Pin ours.
		tsconfig: fileURLToPath(new URL('./tsconfig.json', import.meta.url)),
	},
});
