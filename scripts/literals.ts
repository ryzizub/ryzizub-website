// `npm run literals`: facts the site states live in src/site.config.ts (and the
// lists in src/content/*.json), never typed into a component or page. Fails on
// any of them found in src outside the config.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const LITERALS = [/dominik@simonik\.me/, /ryzizub\.com/, /Šimoník/, /Simonik/i, /linkedin\.com/, /github\.com\/ryzizub/, /x\.com\/ryzizub/, /primal\.net/, /instagram\.com/];
const ALLOWED = new Set(['src/site.config.ts']);
const EXTENSIONS = new Set(['.astro', '.ts', '.tsx', '.css']);

async function* files(dir: string): AsyncGenerator<string> {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) yield* files(full);
		else if (EXTENSIONS.has(path.extname(entry.name))) yield full;
	}
}

let found = 0;
for await (const file of files('src')) {
	if (ALLOWED.has(file)) continue;
	const lines = (await readFile(file, 'utf8')).split('\n');
	lines.forEach((line, index) => {
		const hit = LITERALS.find((literal) => literal.test(line));
		if (hit) {
			found += 1;
			console.error(`${file}:${index + 1}: ${hit.source} belongs in src/site.config.ts`);
		}
	});
}

if (found > 0) process.exit(1);
console.log('No site facts typed outside src/site.config.ts.');
