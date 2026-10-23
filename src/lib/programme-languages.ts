/** Languages a party can publish its programme in. Finnish is always present. */
export const programmeLanguages = ['fi', 'sv'] as const;
export type ProgrammeLanguage = (typeof programmeLanguages)[number];
