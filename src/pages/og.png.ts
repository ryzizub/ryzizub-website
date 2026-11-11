// The share image for Open Graph and X, rendered once at build time.
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import satori, { type Font } from 'satori';
import sharp from 'sharp';
import { OgCard } from '../lib/og-card';

const FONT_DIR = path.join(process.cwd(), 'node_modules', '@fontsource');

/** One weight of one subset. Latin Extended gets its own name ("… Ext"); og-card.tsx lists both. */
async function font(family: string, name: string, weight: 400 | 600 | 700 | 800, subset: 'latin' | 'latin-ext'): Promise<Font> {
	const data = await readFile(path.join(FONT_DIR, family, 'files', `${family}-${subset}-${weight}-normal.woff`));
	return { name: subset === 'latin' ? name : `${name} Ext`, data, weight, style: 'normal' };
}

export const GET: APIRoute = async () => {
	const fonts = await Promise.all(
		(['latin', 'latin-ext'] as const).flatMap((subset) => [
			font('jetbrains-mono', 'JetBrains Mono', 700, subset),
			font('jetbrains-mono', 'JetBrains Mono', 800, subset),
			font('ibm-plex-sans', 'IBM Plex Sans', 400, subset),
			font('ibm-plex-sans', 'IBM Plex Sans', 600, subset),
		]),
	);
	const photo = await sharp(path.join(process.cwd(), 'src/assets/profile.jpeg')).resize(264, 264, { fit: 'cover' }).jpeg({ quality: 88 }).toBuffer();
	const builds = (await getCollection('builds')).sort((a, b) => a.data.order - b.data.order);

	const svg = await satori(OgCard({ photo: `data:image/jpeg;base64,${photo.toString('base64')}`, arg: builds[0].data.arg }), {
		width: 1200,
		height: 630,
		fonts,
	});
	const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
