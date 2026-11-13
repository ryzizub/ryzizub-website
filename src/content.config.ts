import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { file } from 'astro/loaders';
import { ICONS } from './lib/icons';

const icon = z.enum(Object.keys(ICONS) as [keyof typeof ICONS, ...(keyof typeof ICONS)[]]);
/** A file name in src/assets/logos, src/assets/apps or src/assets/sites, without the folder. src/lib/assets.ts fails the build on a typo. */
const asset = z.string();

// What the /build palette lists. `arg` is what the input types, `hint` the short tag.
const builds = defineCollection({
	loader: file('src/content/builds.json'),
	schema: z.object({
		order: z.number().int(),
		title: z.string(),
		arg: z.string(),
		description: z.string(),
		hint: z.string(),
		icon,
	}),
});

const credentials = defineCollection({
	loader: file('src/content/credentials.json'),
	schema: z.object({
		order: z.number().int(),
		title: z.string(),
		detail: z.string(),
		mark: asset,
		/** Rendered width of the mark inside its 40px tile. */
		markWidth: z.number().int(),
	}),
});

// Apps he shipped and can name in public. Client work stays generic (NDA).
const apps = defineCollection({
	loader: file('src/content/apps.json'),
	schema: z.object({
		order: z.number().int(),
		name: z.string(),
		description: z.string(),
		role: z.string(),
		years: z.string(),
		icon: asset,
		/** The icon is a logo that needs padding inside the tile. */
		padded: z.boolean().default(false),
		/** The icon is drawn for a dark tile. */
		dark: z.boolean().default(false),
		nda: z.boolean().default(false),
	}),
});

// Websites he builds, shown with a screenshot of the live site.
const websites = defineCollection({
	loader: file('src/content/websites.json'),
	schema: z.object({
		order: z.number().int(),
		name: z.string(),
		description: z.string(),
		href: z.url(),
		/** A 1280×800 screenshot of the top of the site, in src/assets/sites. */
		screenshot: asset,
	}),
});

// The open-source AI tooling he maintains, each linking to its repo.
const tooling = defineCollection({
	loader: file('src/content/tooling.json'),
	schema: z.object({
		order: z.number().int(),
		name: z.string(),
		description: z.string(),
		/** What it is, set in the mono: "Claude Code plugin", "CLI". */
		kind: z.string(),
		href: z.url(),
	}),
});

// His work with AI, oldest first, one row per year.
const milestones = defineCollection({
	loader: file('src/content/milestones.json'),
	schema: z.object({
		order: z.number().int(),
		year: z.string(),
		title: z.string(),
		detail: z.string(),
	}),
});

const quests = defineCollection({
	loader: file('src/content/quests.json'),
	schema: z.object({
		order: z.number().int(),
		name: z.string(),
		status: z.string(),
		/** live pulses, proto is a ring. */
		statusKind: z.enum(['live', 'proto']),
		description: z.string(),
		stack: z.array(z.string()),
		art: z.enum(['refrane', 'compass']),
	}),
});

// Talks, videos and articles, newest first by `order`.
const talks = defineCollection({
	loader: file('src/content/talks.json'),
	schema: z.object({
		order: z.number().int(),
		kind: z.enum(['talk', 'video', 'article']),
		title: z.string(),
		/** Who it was with, or where it was published. */
		note: z.string(),
		/** Event or channel, then the date, as shown. */
		meta: z.string(),
		href: z.url().optional(),
		logo: asset,
		logoHeight: z.number().int(),
		/** The logo is drawn for light backgrounds and is shown in white. */
		logoMono: z.boolean().default(false),
		/** Words set next to a logo that is only a symbol. */
		logoText: z.string().optional(),
	}),
});

// The teams, communities and stages strip.
const logos = defineCollection({
	loader: file('src/content/logos.json'),
	schema: z.object({
		order: z.number().int(),
		name: z.string(),
		file: asset,
		height: z.number().int(),
		/** The logo is drawn for light backgrounds and is shown in white. */
		mono: z.boolean().default(false),
		text: z.string().optional(),
	}),
});

export const collections = { builds, credentials, apps, websites, tooling, milestones, quests, talks, logos };
