import type { APIRoute } from 'astro';
import config from '../site.config';

export const GET: APIRoute = () =>
	new Response(['User-agent: *', 'Allow: /', '', `Sitemap: ${new URL('/sitemap-index.xml', config.site.url).href}`, ''].join('\n'), {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
