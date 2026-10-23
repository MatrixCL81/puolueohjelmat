import { defineParams } from '@sveltejs/kit/params';
// Node loads this file directly at build time, so the import needs the real `.ts` extension.
import { programmeLanguages, type ProgrammeLanguage } from '#lib/programme-languages.ts';

export const params = defineParams({
	ohjelmakieli: (param) =>
		programmeLanguages.find((language): language is ProgrammeLanguage => language === param)
});
