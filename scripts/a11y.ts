// `npm run a11y`: axe on the built site (dist/) at desktop and phone width.
// Fails on any WCAG 2.2 A/AA violation. Run `npm run build` first.
import { createServer, type Server } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { AxeBuilder } from '@axe-core/playwright';
import { chromium, type Browser } from 'playwright';

const DIST = path.resolve('dist');
const PAGES = ['/', '/404.html'];
const VIEWPORTS = [
	{ name: 'desktop', width: 1280, height: 900 },
	{ name: 'phone', width: 390, height: 844 },
];
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

const TYPES: Record<string, string> = {
	'.html': 'text/html; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.webp': 'image/webp',
	'.ico': 'image/x-icon',
	'.woff2': 'font/woff2',
	'.xml': 'application/xml; charset=utf-8',
};

/** A static server for dist/, like nginx in the image: the file, else the page with .html, else 404. */
function serve(): Promise<{ server: Server; origin: string }> {
	const server = createServer(async (request, response) => {
		const url = decodeURIComponent((request.url ?? '/').split('?')[0]);
		const candidates = url.endsWith('/') ? [`${url}index.html`] : [url, `${url}.html`];
		for (const candidate of candidates) {
			const file = path.join(DIST, candidate);
			if (!file.startsWith(DIST)) break;
			try {
				const body = await readFile(file);
				response.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] ?? 'application/octet-stream' });
				response.end(body);
				return;
			} catch {
				// Try the next candidate.
			}
		}
		response.writeHead(404).end();
	});
	return new Promise((resolve) => {
		server.listen(0, '127.0.0.1', () => {
			const address = server.address();
			const port = typeof address === 'object' && address ? address.port : 0;
			resolve({ server, origin: `http://127.0.0.1:${port}` });
		});
	});
}

/** Playwright's own Chromium (CI installs it), else the Chrome installed on this machine. */
async function launch(): Promise<Browser> {
	try {
		return await chromium.launch();
	} catch {
		return chromium.launch({ channel: 'chrome' });
	}
}

const { server, origin } = await serve();
const browser = await launch();
let violations = 0;

try {
	for (const viewport of VIEWPORTS) {
		const context = await browser.newContext({ viewport, reducedMotion: 'reduce' });
		for (const pagePath of PAGES) {
			const page = await context.newPage();
			await page.goto(origin + pagePath, { waitUntil: 'networkidle' });
			const result = await new AxeBuilder({ page }).withTags(TAGS).analyze();
			for (const violation of result.violations) {
				violations += violation.nodes.length;
				console.error(`✗ ${pagePath} (${viewport.name}) ${violation.id}: ${violation.help}`);
				for (const node of violation.nodes) console.error(`    ${node.target.join(' ')}`);
			}
			if (result.violations.length === 0) console.log(`✓ ${pagePath} (${viewport.name})`);
			await page.close();
		}
		await context.close();
	}
} finally {
	await browser.close();
	server.close();
}

if (violations > 0) {
	console.error(`${violations} accessibility violation(s).`);
	process.exit(1);
}
