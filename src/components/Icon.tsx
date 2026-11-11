import { ICONS, type IconName } from '../lib/icons';

interface Props {
	name: IconName;
	/** Defaults to the stroke icon style in global.css. */
	className?: string;
}

/** A stroke icon on a 24px grid, drawn with currentColor. Renders on the server in Astro pages too. */
export default function Icon({ name, className = 'ico' }: Props) {
	return (
		<svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
			<path d={ICONS[name]} />
		</svg>
	);
}
