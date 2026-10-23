<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { localized } from '#lib/i18n.js';
	import { m } from '#lib/paraglide/messages.js';

	const title = $derived(page.status === 404 ? m.error_not_found() : m.error_generic());
</script>

<svelte:head>
	<title>{title} – {m.site_name()}</title>
</svelte:head>

<h1>{title}</h1>
<p><a href={localized(resolve('/'))}>{m.error_back_home()}</a></p>
