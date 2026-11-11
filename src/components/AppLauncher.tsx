import { useState } from 'react';
import AppIcon, { type ImageData } from './AppIcon';
import styles from './AppLauncher.module.css';

export interface LauncherApp {
	name: string;
	description: string;
	role: string;
	years: string;
	image: ImageData;
	padded: boolean;
	dark: boolean;
	nda: boolean;
}

interface Props {
	apps: LauncherApp[];
}

/** Shipped apps as a launcher: a grid of icons, the picked app explained beside it. */
export default function AppLauncher({ apps }: Props) {
	const [selected, setSelected] = useState(0);

	return (
		<div className={styles.launch}>
			<div className={styles.grid} role="group" aria-label="Shipped apps">
				{apps.map((app, index) => (
					<button
						key={app.name}
						type="button"
						className={index === selected ? `${styles.tile} ${styles.on}` : styles.tile}
						aria-pressed={index === selected}
						onClick={() => setSelected(index)}
					>
						<AppIcon image={app.image} padded={app.padded} dark={app.dark} className={styles.tileIcon} />
						<b>{app.name}</b>
						<small>{app.years}</small>
					</button>
				))}
			</div>
			<div className={styles.detail} aria-live="polite">
				{apps.map((app, index) => (
					<div key={app.name} className={styles.card} hidden={index !== selected}>
						<AppIcon image={app.image} padded={app.padded} dark={app.dark} className={styles.cardIcon} />
						<h3>{app.name}</h3>
						<p className={styles.when}>
							{app.role} · {app.years}
						</p>
						<p className={styles.say}>{app.description}</p>
						{app.nda && <span className={`chip ${styles.nda}`}>Under NDA</span>}
					</div>
				))}
			</div>
		</div>
	);
}
