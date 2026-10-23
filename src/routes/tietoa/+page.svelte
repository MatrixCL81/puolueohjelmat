<script lang="ts">
	import Lorem from '#lib/components/Lorem.svelte';
	import TableOfContents from '#lib/components/TableOfContents.svelte';
	import { m } from '#lib/paraglide/messages.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	// Section IDs are linked from other pages; keep them stable.
	const sections = [
		{ id: 'menetelma', title: m.about_method() },
		{ id: 'rajoitukset', title: m.about_limitations() },
		{ id: 'puolueiden-valinta', title: m.about_party_selection() },
		{ id: 'rahoitus', title: m.about_funding() },
		{ id: 'tekoaly', title: m.about_ai() },
		{ id: 'korjaukset', title: m.about_corrections() }
	];
</script>

<svelte:head>
	<title>{m.about_title()} – {m.site_name()}</title>
</svelte:head>

<h1>{m.about_title()}</h1>
<Lorem />

<TableOfContents {sections} />

{#each sections as section (section.id)}
	<section aria-labelledby={section.id}>
		<h2 id={section.id}>{section.title}</h2>
		<Lorem paragraphs={2} />
		{#if section.id === 'menetelma'}
			<h3>{m.about_system_prompt()}</h3>
			<pre lang="en">{data.systemPrompt}</pre>
		{/if}
	</section>
{/each}
