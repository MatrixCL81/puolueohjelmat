import systemPrompt from '#lib/server/system-prompt.md?raw';
import type { PageServerLoad } from './$types';

// Rendered from the same file the chat endpoint sends to the model.
export const load: PageServerLoad = () => ({ systemPrompt });
