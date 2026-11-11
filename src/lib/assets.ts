import type { ImageMetadata } from 'astro';
import type { ImageData } from '../components/AppIcon';

// Logos and app icons, looked up by file name from the content JSON.
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/{logos,apps}/*.{svg,png}', { eager: true });

const byName = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(files)) {
	byName.set(path.slice(path.lastIndexOf('/') + 1), mod.default);
}

export function asset(name: string): ImageMetadata {
	const image = byName.get(name);
	if (!image) throw new Error(`No asset "${name}" in src/assets/logos or src/assets/apps`);
	return image;
}

/** The same image as plain data, for a React island's props. */
export function imageData(name: string): ImageData {
	const { src, width, height } = asset(name);
	return { src, width, height };
}
