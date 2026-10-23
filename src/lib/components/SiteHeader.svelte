<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { localized } from '#lib/i18n.js';
	import { m } from '#lib/paraglide/messages.js';
	import LanguageSwitcher from './LanguageSwitcher.svelte';

	const links = [
		{ route: '/puolueet', label: m.nav_parties },
		{ route: '/tietoa', label: m.nav_about },
		{ route: '/tietosuoja', label: m.nav_privacy }
	] as const;
</script>

<header class="site-header">
	<a class="site-name" href={localized(resolve('/'))}>{m.site_name()}</a>
	<nav aria-label={m.nav_label()}>
		<ul>
			{#each links as link (link.route)}
				<li>
					<a
						href={localized(resolve(link.route))}
						aria-current={page.route.id?.startsWith(link.route) ? 'page' : undefined}
						>{link.label()}</a
					>
				</li>
			{/each}
		</ul>
	</nav>
	<LanguageSwitcher />
</header>

<style>
	.site-header {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem 2rem;
		align-items: center;
		justify-content: space-between;
		padding: 1rem var(--gutter);
		border-block-end: 1px solid var(--color-border);
	}

	.site-name {
		font-weight: 700;
		text-decoration: none;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	[aria-current] {
		font-weight: 700;
	}
</style>
