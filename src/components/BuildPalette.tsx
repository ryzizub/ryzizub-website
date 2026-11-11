import { useEffect, useState } from 'react';
import type { IconName } from '../lib/icons';
import Icon from './Icon';
import styles from './BuildPalette.module.css';

export interface Build {
	title: string;
	/** What the input types after /build. */
	arg: string;
	description: string;
	hint: string;
	icon: IconName;
}

interface Props {
	builds: Build[];
	contactHref: string;
}

const TYPE_MS = 46;
const HOLD_MS = 2600;
const NEXT_ROW_MS = 240;

/**
 * The hero: a command palette. It types through what he builds once, then
 * rests on the first row. Picking a row stops the typing. No typing under
 * reduced motion.
 */
export default function BuildPalette({ builds, contactHref }: Props) {
	const [selected, setSelected] = useState(0);
	/** Letters of the argument shown; null means all of them. */
	const [typed, setTyped] = useState<number | null>(null);
	const [typing, setTyping] = useState(true);

	useEffect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setTyping(false);
	}, []);

	useEffect(() => {
		if (!typing) return undefined;
		const full = builds[selected].arg.length;
		const shown = typed ?? full;
		const timer = window.setTimeout(
			() => {
				if (shown < full) {
					setTyped(shown + 1 === full ? null : shown + 1);
				} else if (selected + 1 === builds.length) {
					setSelected(0);
					setTyping(false);
				} else {
					setSelected(selected + 1);
					setTyped(0);
				}
			},
			shown === full ? HOLD_MS : shown === 0 ? NEXT_ROW_MS : TYPE_MS,
		);
		return () => window.clearTimeout(timer);
	}, [typing, selected, typed, builds]);

	const pick = (index: number) => {
		setTyping(false);
		setSelected(index);
		setTyped(null);
	};

	const current = builds[selected];
	const args = builds.map((build) => build.arg);
	const sentence = `I build ${args.slice(0, -1).join(', ')} and ${args.at(-1)}.`;

	return (
		<div className="pal">
			<h1 className={`in ${styles.input}`}>
				<span className="sr">{sentence}</span>
				<span className="in-v" aria-hidden="true">
					<Icon name="chevron" className="pr" />
					<span className="cmd">/build</span>
					<span className="ln2">
						<span className="arg">{typed === null ? current.arg : current.arg.slice(0, typed)}</span>
						<i className="caret blink" />
					</span>
				</span>
			</h1>
			<div className={styles.split}>
				<div className={styles.rows} role="group" aria-label="What I build">
					{builds.map((build, index) => (
						<button
							key={build.arg}
							type="button"
							className={index === selected ? `${styles.row} ${styles.on}` : styles.row}
							aria-pressed={index === selected}
							onClick={() => pick(index)}
						>
							<span className={styles.icon} aria-hidden="true">
								<Icon name={build.icon} />
							</span>
							<b>{build.title}</b>
							<span className="sr">: {build.description}</span>
						</button>
					))}
				</div>
				<div className={styles.pane}>
					<span className="chip">{current.hint}</span>
					<p className={styles.description}>{current.description}</p>
					<a className={`btn ${styles.cta}`} href={contactHref}>
						Contact me
						<span className="key" aria-hidden="true">
							<Icon name="enter" />
						</span>
					</a>
				</div>
			</div>
		</div>
	);
}
