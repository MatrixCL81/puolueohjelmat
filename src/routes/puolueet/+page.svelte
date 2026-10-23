<script lang="ts">
	import { resolve } from '$app/paths';
	import Lorem from '#lib/components/Lorem.svelte';
	import { formatDate, localized, programmeLanguageName } from '#lib/i18n.js';
	import { m } from '#lib/paraglide/messages.js';
	import { getLocale } from '#lib/paraglide/runtime.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const locale = getLocale();
</script>

<svelte:head>
	<title>{m.parties_title()} – {m.site_name()}</title>
</svelte:head>

<h1>{m.parties_title()}</h1>
<Lorem />
<p>
	<a href={localized(resolve('/tietoa#puolueiden-valinta'))}>{m.parties_selection_link()}</a>
</p>

<!-- Alphabetical by Finnish name in every UI language. -->
<ul class="parties">
	{#each data.parties as party (party.slug)}
		<li>
			<h2>{party.name[locale]} ({party.abbreviation[locale]})</h2>
			<ul>
				{#each party.languages as language (language)}
					<li>
						<a
							href={localized(
								resolve('/puolueet/[puolue]/[kieli=ohjelmakieli]', {
									puolue: party.slug,
									kieli: language
								})
							)}>{m.programme_link({ language: programmeLanguageName(language) })}</a
						>
					</li>
				{/each}
			</ul>
			<p>
				{m.programme_version()}:
				{#if party.version}
					<time datetime={party.version}>{formatDate(party.version)}</time>
				{:else}
					{m.programme_not_available()}
				{/if}
			</p>
		</li>
	{/each}
</ul>

<style>
	.parties {
		padding: 0;
		list-style: none;
	}

	.parties > li {
		padding-block: 1rem;
		border-block-end: 1px solid var(--color-border);
	}

	h2 {
		margin-block: 0 0.5rem;
		font-size: 1.25rem;
	}
</style>
