<script lang="ts">
	import { m } from '#lib/paraglide/messages.js';

	interface Section {
		id: string;
		title: string;
		sections?: Section[];
	}

	let { sections }: { sections: Section[] } = $props();
</script>

{#snippet list(items: Section[])}
	<ol>
		{#each items as item (item.id)}
			<li>
				<a href="#{item.id}">{item.title}</a>
				{#if item.sections}
					{@render list(item.sections)}
				{/if}
			</li>
		{/each}
	</ol>
{/snippet}

<nav class="toc" aria-labelledby="toc-heading">
	<h2 id="toc-heading">{m.toc_heading()}</h2>
	{@render list(sections)}
</nav>
