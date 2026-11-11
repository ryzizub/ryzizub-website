// The home-screen icon on iOS: the profile photo, square. The tab favicon stays public/favicon.ico.
import path from 'node:path';
import type { APIRoute } from 'astro';
import sharp from 'sharp';

export const GET: APIRoute = async () => {
	const png = await sharp(path.join(process.cwd(), 'src/assets/profile.jpeg')).resize(180, 180, { fit: 'cover' }).png().toBuffer();
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
