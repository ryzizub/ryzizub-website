// /llms.txt: the page as plain Markdown, for language models and agents (https://llmstxt.org).
import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import config from '../site.config';

const sorted = <T extends { data: { order: number } }>(entries: T[]): T['data'][] =>
	entries.sort((a, b) => a.data.order - b.data.order).map((entry) => entry.data);

export const GET: APIRoute = async () => {
	const { person, site, links, sections, speaking } = config;
	const builds = sorted(await getCollection('builds'));
	const apps = sorted(await getCollection('apps'));
	const quests = sorted(await getCollection('quests'));
	const talks = sorted(await getCollection('talks'));
	const credentials = sorted(await getCollection('credentials'));

	const talk = (t: CollectionEntry<'talks'>['data']) => `- ${t.href ? `[${t.title}](${t.href})` : t.title}: ${t.meta}. ${t.note}.`;

	const text = [
		`# ${person.name}`,
		'',
		`> ${person.headline} ${person.role} at ${person.company}, ${person.gde}, ${person.community}, ${person.talks} talks. ${person.city}.`,
		'',
		'## What I build',
		'',
		...builds.map((b) => `- ${b.title}: ${b.description}`),
		'',
		'## Credentials',
		'',
		...credentials.map((c) => `- ${c.title}: ${c.detail}`),
		'',
		`## ${sections.apps.title.replace(/\.$/, '')}`,
		'',
		...apps.map((a) => `- ${a.name} (${a.role}, ${a.years}): ${a.description}`),
		'',
		`## Side quests: ${sections.quests.title.replace(/\.$/, '')}`,
		'',
		...quests.map((q) => `- ${q.name} (${q.status}): ${q.description} Stack: ${q.stack.join(', ')}.`),
		'',
		`## ${sections.talks.title.replace(/\.$/, '')}`,
		'',
		sections.talks.intro,
		`In person in ${speaking.countries.length} countries (${speaking.countries.join(', ')}). Stages include ${speaking.stages}`,
		'',
		...talks.map(talk),
		'',
		'## Contact',
		'',
		`- Email: ${person.email}`,
		...links.map((link) => `- ${link.label}: ${link.href}`),
		`- Website: ${site.url}`,
		'',
	].join('\n');

	return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
