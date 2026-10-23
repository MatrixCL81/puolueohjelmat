import { parse } from 'yaml';
import type { Locale } from '#lib/paraglide/runtime.js';
import type { ProgrammeLanguage } from '#lib/programme-languages.js';

export interface Party {
	/** Directory name under `content/puolueet/`, e.g. `kok`. */
	slug: string;
	name: Record<Locale, string>;
	abbreviation: Record<Locale, string>;
	/** URL of the original programme as published by the party. */
	source: string | null;
	/** Version date of the programme (ISO 8601). */
	version: string | null;
	languages: ProgrammeLanguage[];
}

const metaFiles = import.meta.glob<string>('/content/puolueet/*/meta.yml', {
	query: '?raw',
	import: 'default',
	eager: true
});

const svFiles = import.meta.glob('/content/puolueet/*/sv.md');

const slugOf = (path: string) => path.split('/').at(-2)!;

const svSlugs = new Set(Object.keys(svFiles).map(slugOf));

const collator = new Intl.Collator('fi');

// Parties are always listed in alphabetical order of their Finnish name.
const parties: Party[] = Object.entries(metaFiles)
	.map(([path, raw]) => {
		const slug = slugOf(path);
		const meta = parse(raw);
		return {
			slug,
			name: meta.name,
			abbreviation: meta.abbreviation,
			source: meta.source ?? null,
			version: meta.version ?? null,
			languages: svSlugs.has(slug) ? ['fi', 'sv'] : ['fi']
		} satisfies Party;
	})
	.sort((a, b) => collator.compare(a.name.fi, b.name.fi));

export function getParties(): Party[] {
	return parties;
}

export function getParty(slug: string): Party | undefined {
	return parties.find((party) => party.slug === slug);
}
