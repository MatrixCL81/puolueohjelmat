<script lang="ts">
	import Disclaimer from '#lib/components/Disclaimer.svelte';
	import Lorem from '#lib/components/Lorem.svelte';
	import { loremWords } from '#lib/lorem.js';
	import { m } from '#lib/paraglide/messages.js';

	// Placeholders. Real example questions must not favour any party's issues.
	const examples = [loremWords(7, 0), loremWords(9, 20), loremWords(6, 40)].map((q) => `${q}?`);

	// Placeholders. Real sources link to anchors in the programme pages.
	const sources = [loremWords(5, 10), loremWords(4, 30), loremWords(6, 50)];

	let textarea: HTMLTextAreaElement;
	let question = $state('');
	let asked = $state('');

	function ask(event: SubmitEvent) {
		event.preventDefault();
		// Placeholder until the chat endpoint exists: show the structure of an answer.
		asked = question.trim();
	}

	function useExample(example: string) {
		question = example;
		textarea.focus();
	}
</script>

<svelte:head>
	<title>{m.home_title()} – {m.site_name()}</title>
</svelte:head>

<form class="ask" onsubmit={ask}>
	<h1><label for="question">{m.home_heading()}</label></h1>
	<textarea
		id="question"
		name="question"
		rows="4"
		required
		aria-describedby="disclaimer"
		bind:this={textarea}
		bind:value={question}></textarea>
	<Disclaimer id="disclaimer" />
	<button type="submit">{m.home_submit()}</button>
</form>

<section aria-labelledby="examples-heading">
	<h2 id="examples-heading">{m.home_examples_heading()}</h2>
	<ul class="examples">
		{#each examples as example (example)}
			<li>
				<button type="button" lang="la" onclick={() => useExample(example)}>{example}</button>
			</li>
		{/each}
	</ul>
</section>

<div class="answer" aria-live="polite">
	{#if asked}
		<section aria-labelledby="answer-heading">
			<h2 id="answer-heading">{m.answer_heading()}</h2>
			<Lorem paragraphs={2} />
			<h3>{m.answer_sources()}</h3>
			<ol>
				{#each sources as source (source)}
					<li lang="la">{source}</li>
				{/each}
			</ol>
			<Disclaimer />
		</section>
	{/if}
</div>

<style>
	.ask {
		display: grid;
		gap: 1rem;
	}

	h1 {
		margin-block-end: 0;
	}

	textarea {
		width: 100%;
		box-sizing: border-box;
		padding: 0.75rem;
		font: inherit;
	}

	button[type='submit'] {
		justify-self: start;
		padding: 0.5rem 1.5rem;
		font: inherit;
	}

	.examples {
		display: grid;
		gap: 0.5rem;
		padding: 0;
		list-style: none;
	}

	.examples button {
		padding: 0.5rem 0.75rem;
		font: inherit;
		text-align: start;
	}
</style>
