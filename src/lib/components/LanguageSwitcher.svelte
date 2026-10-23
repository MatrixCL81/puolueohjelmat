<script lang="ts">
	import type { ResolvedPathname } from '$app/types';
	import { page } from '$app/state';
	import { localized } from '#lib/i18n.js';
	import { m } from '#lib/paraglide/messages.js';
	import { getLocale, locales, type Locale } from '#lib/paraglide/runtime.js';

	// Each language is named in itself, so it is recognisable whatever the current language.
	const names: Record<Locale, string> = { fi: 'Suomeksi', sv: 'På svenska', en: 'In English' };
</script>

<nav class="languages" aria-label={m.language_label()}>
	<ul>
		{#each locales as locale (locale)}
			<li>
				<!-- Full reload: messages are not reactive to a client-side locale change. -->
				<a
					href={localized(page.url.pathname as ResolvedPathname, locale)}
					hreflang={locale}
					lang={locale}
					aria-current={locale === getLocale() ? 'true' : undefined}
					data-sveltekit-reload>{names[locale]}</a
				>
			</li>
		{/each}
	</ul>
</nav>

<style>
	ul {
		display: flex;
		gap: 1rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	[aria-current] {
		font-weight: 700;
		text-decoration: none;
	}
</style>
