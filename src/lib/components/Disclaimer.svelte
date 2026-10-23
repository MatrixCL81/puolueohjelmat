<script lang="ts">
	import { resolve } from '$app/paths';
	import { localized } from '#lib/i18n.js';
	import { m } from '#lib/paraglide/messages.js';

	let { id }: { id?: string } = $props();
</script>

<p class="disclaimer" {id}>
	{m.disclaimer_short()}
	<a href={localized(resolve('/tietoa#rajoitukset'))}>{m.disclaimer_more()}</a>
</p>

<style>
	.disclaimer {
		padding: 0.75rem 1rem;
		border-inline-start: 0.25rem solid var(--color-accent);
		background: var(--color-muted-bg);
	}
</style>
