import { getParties } from '#lib/server/parties.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => ({ parties: getParties() });
