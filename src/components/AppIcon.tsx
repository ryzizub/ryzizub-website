import styles from './AppIcon.module.css';

/** What an island needs to draw an image: resolved in Astro, passed as plain data. */
export interface ImageData {
	src: string;
	width: number;
	height: number;
}

interface Props {
	image: ImageData;
	/** The icon is a logo that needs padding inside the tile. */
	padded?: boolean;
	/** The icon is drawn for a dark tile. */
	dark?: boolean;
	/** Size and corner radius come from where the tile sits. */
	className?: string;
}

/** An app's icon tile. */
export default function AppIcon({ image, padded = false, dark = false, className }: Props) {
	const classes = [styles.tile, padded && styles.padded, dark && styles.dark, className].filter(Boolean).join(' ');
	return (
		<span className={classes} aria-hidden="true">
			<img src={image.src} width={image.width} height={image.height} alt="" loading="lazy" decoding="async" />
		</span>
	);
}
