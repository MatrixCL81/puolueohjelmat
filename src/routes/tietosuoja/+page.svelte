<script lang="ts">
	import Lorem from '#lib/components/Lorem.svelte';
	import TableOfContents from '#lib/components/TableOfContents.svelte';
	import { m } from '#lib/paraglide/messages.js';

	const sections = [
		{ id: 'rekisterinpitaja', title: m.privacy_controller() },
		{ id: 'kasiteltavat-tiedot', title: m.privacy_data() },
		{ id: 'tarkoitus-ja-oikeusperuste', title: m.privacy_purpose() },
		{ id: 'kasittelijat', title: m.privacy_processors() },
		{ id: 'sailytys', title: m.privacy_retention() },
		{ id: 'oikeudet', title: m.privacy_rights() },
		{ id: 'yhteystiedot', title: m.privacy_contact() }
	];
</script>

<svelte:head>
	<title>{m.privacy_title()} – {m.site_name()}</title>
</svelte:head>

<h1>{m.privacy_title()}</h1>
<Lorem />

<TableOfContents {sections} />

{#each sections as section (section.id)}
	<section aria-labelledby={section.id}>
		<h2 id={section.id}>{section.title}</h2>
		<Lorem paragraphs={2} />
	</section>
{/each}
