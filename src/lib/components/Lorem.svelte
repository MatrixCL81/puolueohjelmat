<script lang="ts">
	import { loremParagraph } from '#lib/lorem.js';

	let { paragraphs = 1 }: { paragraphs?: number } = $props();
</script>

<!--
	@component
	Placeholder paragraphs for long texts that will be written later.
-->

{#each { length: paragraphs }, i (i)}
	<p lang="la">{loremParagraph}</p>
{/each}
