// The share card (1200×630) as satori markup: the site's palette in one frame.
// Satori lays out with flexbox only, so every element with children is a flex box.
import config from '../site.config';

// Each family is registered twice in og.png.ts, Latin and Latin Extended (Š), under two names.
const MONO = '"JetBrains Mono", "JetBrains Mono Ext"';
const SANS = '"IBM Plex Sans", "IBM Plex Sans Ext"';
const PAD_X = 72;
const PAD_Y = 58;

const C = {
	bg: '#0f1114',
	pan: '#171a1f',
	line: '#2a2f37',
	ink: '#ecedef',
	soft: '#c9cdd3',
	mut: '#9aa1ab',
	acc: '#ff7a2f',
	chevron: '#5f6773',
};

interface Props {
	/** The profile photo as a data URL. */
	photo: string;
	/** What the palette shows after /build. */
	arg: string;
}

export function OgCard({ photo, arg }: Props) {
	const { person, site } = config;
	const highlights = [person.gde, `${person.talks} talks`, person.community];

	return (
		<div
			style={{
				// Satori adds padding to the size, so the box is the card minus its padding.
				width: 1200 - 2 * PAD_X,
				height: 630 - 2 * PAD_Y,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				padding: `${PAD_Y}px ${PAD_X}px`,
				background: C.bg,
				color: C.ink,
				fontFamily: SANS,
			}}
		>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<div style={{ display: 'flex', alignItems: 'center', fontFamily: MONO, fontSize: 36, fontWeight: 700, letterSpacing: -0.7 }}>
						{person.name}
						<div style={{ width: 17, height: 36, marginLeft: 9, borderRadius: 3, background: C.acc }} />
					</div>
					<div style={{ display: 'flex', marginTop: 12, fontSize: 27, color: C.mut }}>
						{person.role} at {person.company}
					</div>
				</div>
				<img src={photo} width={132} height={132} style={{ borderRadius: 30, border: `2px solid ${C.line}` }} />
			</div>

			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div style={{ display: 'flex', fontFamily: MONO, fontSize: 28, color: C.soft }}>
					<span style={{ color: C.acc, marginRight: 16 }}>#</span>
					{person.headline}
				</div>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						marginTop: 20,
						padding: '30px 36px',
						border: `2px solid ${C.line}`,
						borderRadius: 28,
						background: C.pan,
						fontFamily: MONO,
						fontSize: 76,
						fontWeight: 800,
						letterSpacing: -2.3,
					}}
				>
					<svg width="46" height="46" viewBox="0 0 24 24" style={{ marginRight: 26 }}>
						<path d="M9 6l6 6-6 6" fill="none" stroke={C.chevron} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
					<span style={{ color: C.acc }}>/build</span>
					<span style={{ marginLeft: 42 }}>{arg}</span>
					<div style={{ width: 38, height: 76, marginLeft: 8, borderRadius: 4, background: C.acc }} />
				</div>
			</div>

			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: MONO, fontSize: 24, color: C.mut }}>
				<div style={{ display: 'flex' }}>{highlights.join('  ·  ')}</div>
				<div style={{ display: 'flex', color: C.ink }}>{new URL(site.url).host}</div>
			</div>
		</div>
	);
}
