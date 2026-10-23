import type { ResolvedPathname } from '$app/types';
import { m } from '#lib/paraglide/messages.js';
import { getLocale, localizeHref, type Locale } from '#lib/paraglide/runtime.js';
import type { ProgrammeLanguage } from '#lib/programme-languages.js';

/** Prefixes a path from `resolve()` with the current (or given) locale. */
export function localized(path: ResolvedPathname, locale?: Locale): ResolvedPathname {
	// Paraglide localizes `/` to `/fi/`; drop the slash to avoid SvelteKit's redirect to `/fi`.
	return localizeHref(path, { locale }).replace(/(.)\/$/, '$1') as ResolvedPathname;
}

const programmeLanguageNames: Record<ProgrammeLanguage, () => string> = {
	fi: m.programme_language_fi,
	sv: m.programme_language_sv
};

/** "in Finnish", "in Swedish" in the current UI language. */
export function programmeLanguageName(language: ProgrammeLanguage): string {
	return programmeLanguageNames[language]();
}

/** Formats an ISO date for the current UI language. */
export function formatDate(iso: string): string {
	return new Intl.DateTimeFormat(getLocale(), { dateStyle: 'long' }).format(new Date(iso));
}
