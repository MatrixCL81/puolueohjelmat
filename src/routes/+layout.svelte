<script lang="ts">
	import '../app.css';
	import type { ResolvedPathname } from '$app/types';
	import { page } from '$app/state';
	import favicon from '#lib/assets/favicon.svg';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import { localized } from '#lib/i18n.js';
	import { m } from '#lib/paraglide/messages.js';
	import { locales } from '#lib/paraglide/runtime.js';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="description" content={m.site_description()} />
	{#each locales as locale (locale)}
		<link
			rel="alternate"
			hreflang={locale}
			href={localized(page.url.pathname as ResolvedPathname, locale)}
		/>
	{/each}
</svelte:head>

<a class="skip-link" href="#main">{m.skip_to_content()}</a>

<SiteHeader />

<main id="main" tabindex="-1">
	{@render children()}
</main>

<SiteFooter />
