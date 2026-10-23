<script lang="ts">
	import { resolve } from '$app/paths';
	import Lorem from '#lib/components/Lorem.svelte';
	import TableOfContents from '#lib/components/TableOfContents.svelte';
	import { formatDate, localized, programmeLanguageName } from '#lib/i18n.js';
	import { loremWords } from '#lib/lorem.js';
	import { m } from '#lib/paraglide/messages.js';
	import { getLocale } from '#lib/paraglide/runtime.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const locale = getLocale();
	const party = $derived(data.party);
	const language = $derived(data.language);
	const title = $derived(m.programme_title({ party: party.name[locale] }));
	const otherLanguages = $derived(party.languages.filter((other) => other !== language));

	// Placeholder structure. The content pipeline will render the programme from
	// content/puolueet/<slug>/<language>.md, with anchor IDs in the same format.
	const sections = $derived(
		Array.from({ length: 3 }, (_, i) => ({
			id: `${party.slug}-${language}-${i + 1}`,
			title: loremWords(3, i * 7),
			sections: Array.from({ length: 2 }, (_, j) => ({
				id: `${party.slug}-${language}-${i + 1}-${j + 1}`,
				title: loremWords(4, i * 7 + j * 3 + 2)
			}))
		}))
	);
</script>

<svelte:head>
	<title>{title} – {m.site_name()}</title>
</svelte:head>

<nav aria-label={m.breadcrumb_label()}>
	<ol class="breadcrumb">
		<li><a href={localized(resolve('/'))}>{m.nav_home()}</a></li>
		<li><a href={localized(resolve('/puolueet'))}>{m.nav_parties()}</a></li>
		<li aria-current="page">{party.name[locale]}</li>
	</ol>
</nav>

<h1>{title}</h1>

<dl class="meta">
	<dt>{m.programme_version()}</dt>
	<dd>
		{#if party.version}
			<time datetime={party.version}>{formatDate(party.version)}</time>
		{:else}
			{m.programme_not_available()}
		{/if}
	</dd>
	<dt>{m.programme_source()}</dt>
	<dd>
		{#if party.source}
			<a href={party.source} rel="external">{m.programme_source_link()}</a>
		{:else}
			{m.programme_not_available()}
		{/if}
	</dd>
</dl>

{#if language !== locale}
	<p class="notice">
		{m.programme_language_notice({ language: programmeLanguageName(language) })}
	</p>
{/if}

{#if otherLanguages.length > 0}
	<p>
		{m.programme_other_languages()}
		{#each otherLanguages as other (other)}
			<a
				href={localized(
					resolve('/puolueet/[puolue]/[kieli=ohjelmakieli]', { puolue: party.slug, kieli: other })
				)}>{programmeLanguageName(other)}</a
			>
		{/each}
	</p>
{/if}

<TableOfContents {sections} />

<article lang={language}>
	{#each sections as section (section.id)}
		<section>
			<h2 id={section.id} lang="la">{section.title}</h2>
			<Lorem />
			{#each section.sections as subsection (subsection.id)}
				<h3 id={subsection.id} lang="la">{subsection.title}</h3>
				<Lorem paragraphs={2} />
			{/each}
		</section>
	{/each}
</article>

<style>
	.breadcrumb {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding: 0;
		list-style: none;
	}

	.breadcrumb li + li::before {
		content: '›';
		margin-inline-end: 0.5rem;
	}

	.meta {
		display: grid;
		grid-template-columns: max-content 1fr;
		gap: 0.25rem 1rem;
	}

	.meta dd {
		margin: 0;
	}

	.notice {
		padding: 0.75rem 1rem;
		background: var(--color-muted-bg);
	}
</style>
