import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';
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

/** Screen densities a raster is drawn for, as far as the source has the pixels. */
const DENSITIES = [1, 2, 3];

/**
 * An image at the size it is shown, as plain data for an `<img>` or a React
 * island. Give the shown width or height in CSS pixels; the other side follows
 * the image. A raster becomes WebP at that size for 1×, 2× and 3× screens, an
 * SVG stays as it is.
 */
export async function sized(source: string | ImageMetadata, size: { width: number } | { height: number }): Promise<ImageData> {
	const image = typeof source === 'string' ? asset(source) : source;
	const ratio = image.width / image.height;
	const width = 'width' in size ? size.width : Math.round(size.height * ratio);
	const height = 'height' in size ? size.height : Math.round(size.width / ratio);
	if (image.format === 'svg') return { src: image.src, width, height };

	const base = Math.min(width, image.width);
	const densities = DENSITIES.filter((density) => base * density <= image.width);
	const { src, srcSet } = await getImage({ src: image, width: base, densities, format: 'webp' });
	return { src, srcset: densities.length > 1 ? srcSet.attribute : undefined, width, height };
}
