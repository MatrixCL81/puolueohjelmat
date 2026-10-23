import { describe, expect, it } from 'vitest';
import { readdirSync } from 'node:fs';
import { getParties, getParty } from './parties';

describe('parties', () => {
	const parties = getParties();

	it('lists every directory in content/puolueet', () => {
		const dirs = readdirSync('content/puolueet', { withFileTypes: true })
			.filter((entry) => entry.isDirectory())
			.map((entry) => entry.name)
			.sort();
		expect(parties.map((party) => party.slug).sort()).toEqual(dirs);
	});

	it('is sorted by Finnish name', () => {
		const names = parties.map((party) => party.name.fi);
		expect(names).toEqual([...names].sort(new Intl.Collator('fi').compare));
	});

	it('has names and abbreviations in every UI language', () => {
		for (const party of parties) {
			for (const locale of ['fi', 'sv', 'en'] as const) {
				expect(party.name[locale], `${party.slug} name.${locale}`).toBeTruthy();
				expect(party.abbreviation[locale], `${party.slug} abbreviation.${locale}`).toBeTruthy();
			}
		}
	});

	it('always has a Finnish programme', () => {
		for (const party of parties) {
			expect(party.languages).toContain('fi');
		}
	});

	it('finds a party by slug', () => {
		expect(getParty(parties[0].slug)).toBe(parties[0]);
		expect(getParty('does-not-exist')).toBeUndefined();
	});
});
