/**
 * Every fact the site states more than once. Components read from here;
 * copy never repeats a value this file holds. Lists of things (what he builds,
 * apps, side quests, talks, logos) live in src/content/*.json.
 */
const config = {
	person: {
		name: 'Dominik Šimoník',
		handle: 'ryzizub',
		/** The positioning line above the palette. */
		headline: 'Mobile developer who ships.',
		role: 'Technical Delivery Lead',
		company: 'Very Good Ventures',
		city: 'Prague',
		email: 'dominik@simonik.me',
		/** Approved public claim. Never an exact talk count. */
		talks: '50+',
		gde: 'Flutter & Firebase GDE',
		community: 'DevFest.cz organizer',
		/** For search engines and the structured data. */
		knowsAbout: ['Flutter', 'Dart', 'Firebase', 'AI agents', 'Claude Code', 'Genkit', 'Node.js', 'Google Cloud', 'Astro'],
	},
	site: {
		url: 'https://ryzizub.com',
		title: 'Dominik Šimoník · Mobile developer who ships',
		description:
			'Technical Delivery Lead at Very Good Ventures, Flutter & Firebase GDE, DevFest.cz organizer and a speaker with 50+ talks. Mobile apps, AI tooling, websites and backends.',
		locale: 'en',
		/** Open Graph locale. */
		ogLocale: 'en_US',
		/** The share image, rendered at build time by src/pages/og.png.ts. */
		ogImage: { path: '/og.png', width: 1200, height: 630 },
	},
	/** In the order the contact block lists them. */
	links: [
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/dominik-simonik/' },
		{ label: 'GitHub', href: 'https://github.com/ryzizub' },
		{ label: 'X', href: 'https://x.com/ryzizub' },
		{ label: 'Nostr', href: 'https://primal.net/p/nprofile1qqsvsder6vl6smy0qxe9fvwu42sztvk2vkfjp9gdq3xj93qmt5w672gtfg93a' },
		{ label: 'Instagram', href: 'https://www.instagram.com/ryzizub/' },
	],
	mastodon: 'https://mastodon.ryzizub.com/@ryzizub',
	/** Sections, written like the commands that open them. */
	nav: [
		{ label: '/apps', href: '#apps' },
		{ label: '/ai', href: '#ai' },
		{ label: '/side-quests', href: '#quests' },
		{ label: '/talks', href: '#talks' },
		{ label: '/contact', href: '#contact' },
	],
	sections: {
		apps: {
			title: 'Shipped apps.',
			intro: "Mobile apps I've built as CTO, co-founder and volunteer, and for clients at Very Good Ventures.",
		},
		ai: {
			title: 'AI tooling I maintain.',
			intro: "On Very Good Ventures' platform team I maintain our open-source AI tooling. It sets up coding agents with a team's standards.",
		},
		websites: {
			title: 'Websites I build.',
			intro: 'Next to the apps, I build websites in my free time.',
		},
		quests: {
			title: 'Running after hours.',
			intro: 'In my free time I build my own apps and odd experiments, because building something is the fastest way I know to learn it.',
		},
		talks: {
			title: 'Talks and articles.',
			intro: '50+ talks on Flutter, Firebase and AI agents, and the write-ups that go with them. Want me to speak at your event? Email me.',
		},
		contact: {
			title: 'Building something? Say hi',
		},
	},
	speaking: {
		/** In person, from the GDE activity export (Identity page, section 8c). */
		countries: ['Czechia', 'Germany', 'USA', 'Italy', 'Croatia', 'Poland', 'Morocco'],
		stages: 'FlutterCon USA, FlutterCon Europe, mDevCamp, DevFest.cz, DevFests in Casablanca, Pisa, Zagreb and Gela, and Flutter on Air.',
	},
} as const;

export type SiteConfig = typeof config;
export default config;
