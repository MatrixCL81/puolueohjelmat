import { error } from '@sveltejs/kit';
import { getParty } from '#lib/server/parties.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	const party = getParty(params.puolue);
	if (!party || !party.languages.includes(params.kieli)) {
		error(404);
	}
	return { party, language: params.kieli };
};
