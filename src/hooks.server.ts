import { redirect } from '@sveltejs/kit';
import { sequence, type Handle } from '@sveltejs/kit/hooks';
import type { ResolvedPathname } from '$app/types';
import { localized } from '#lib/i18n.js';
import { extractLocaleFromRequest, getTextDirection } from '#lib/paraglide/runtime.js';
import { paraglideMiddleware } from '#lib/paraglide/server.js';

// `/` has no locale prefix and is not prerendered. Paraglide only redirects document
// requests, so redirect every request explicitly (cookie, otherwise Finnish).
const handleRoot: Handle = ({ event, resolve }) => {
	if (event.url.pathname === '/') {
		redirect(307, localized('/' as ResolvedPathname, extractLocaleFromRequest(event.request)));
	}
	return resolve(event);
};

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		return resolve(
			{ ...event, request },
			{
				transformPageChunk: ({ html }) =>
					html
						.replace('%paraglide.lang%', locale)
						.replace('%paraglide.dir%', getTextDirection(locale))
			}
		);
	});

export const handle: Handle = sequence(handleRoot, handleParaglide);
