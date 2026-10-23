<script lang="ts">
	import { resolve } from '$app/paths';
	import { localized } from '#lib/i18n.js';
	import { m } from '#lib/paraglide/messages.js';
</script>

<footer class="site-footer">
	<p>{m.site_description()}</p>
	<ul>
		<li><a href={localized(resolve('/tietoa'))}>{m.nav_about()}</a></li>
		<li><a href={localized(resolve('/tietosuoja'))}>{m.nav_privacy()}</a></li>
	</ul>
</footer>

<style>
	.site-footer {
		margin-block-start: 4rem;
		padding: 2rem var(--gutter);
		border-block-start: 1px solid var(--color-border);
		font-size: 0.9rem;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		padding: 0;
		list-style: none;
	}
</style>
