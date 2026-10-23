# puolueohjelmat.fi

A free, non-commercial, politically neutral election guide for the Finnish parliamentary elections (eduskuntavaalit) of **18 April 2027**. Visitors ask questions in plain language; an AI agent (Mistral API) answers from the parties' own election programmes and cites the exact passages. The same programmes are published on the site as static pages, so every answer can be checked in one click.

The site is a public-interest project, not a product. Bias and hallucinations cannot be fully eliminated in an LLM-based tool. We minimise them, but credibility rests on being honest about it: visitors are clearly warned that answers can be wrong or incomplete, and every answer points to the source text so they can check it themselves. When in doubt, choose the option that is more neutral, more transparent and more verifiable.

## Core principles

These override convenience. Flag any change that would weaken one of them.

1. **One master, derived copies.** The Markdown files in `content/` are the only place programme text is edited. The prerendered pages and `chunks.json` (the agent's context) are both generated from them at build time, through the same parse step. Derived files are never edited by hand, and programme text is never uploaded to or stored at the LLM provider: the Mistral API is called statelessly with the retrieved chunks in each request. Never introduce a second rendering or chunking path (this is why mdsvex is not used).
2. **Honest about limitations.** A clear disclaimer is visible next to the question field: the answers are AI-generated, may be wrong, incomplete or unbalanced, and the programme text is what counts. The about page explains these limitations in more detail.
3. **Every claim is citable.** Answers cite passages by stable anchor IDs that link to the programme page.
4. **Neutrality is structural, not just a prompt.** Retrieval fetches top-k chunks _per party_, so comparative questions give every party equal context. Parties are always listed in alphabetical order of their Finnish name; no party is singled out in UI, examples or defaults. Example questions must not favour any party's issues.
5. **Issue comparisons, not voting advice.** When a visitor asks which party does most on an issue they name, the agent may say which party or parties go furthest on that issue in their programmes, with citations. It names every party that is close rather than declaring a single winner, says so when differences are small or programmes are vague, and makes clear that the comparison covers only that issue and only what the programmes say. It never combines several issues into an overall recommendation and never tells the visitor whom to vote for. Identity-based questions are read as the issue they point to (e.g. LGBTQ+ rights), without assuming further preferences.
6. **Scope: programmes only.** No candidates, no polls, no news, no general chat. Off-topic questions are politely declined.
7. **Privacy by design.** Chat messages can reveal political opinions (special-category data under GDPR). No accounts, no server-side storage of conversations, never log prompt or answer content. Conversation history lives in the browser only. No tracking cookies.
8. **EU-only data path.** Hosting (Clever Cloud, France) and the LLM provider (Mistral, France) are European. Do not add services that send user input to non-EU providers.

## Scope of the MVP

- Parties: only those currently represented in the Eduskunta. The directory `content/puolueet/` is the authoritative list. Other participating parties may be added later.
- Pages: home (central textarea under "Mitä haluat tietää?", disclaimer next to it, streaming answer with sources and disclaimer), party overview, one page per programme, about (methodology including the full system prompt, known limitations, party selection, funding, AI disclosure, contact for corrections), privacy notice (tietosuojaseloste).
- UI languages: Finnish (base), Swedish, English, via Paraglide with path prefixes `/fi`, `/sv`, `/en`.
- Safeguards: rate limiting, a daily spending cap with graceful fallback (static pages keep working when the chat is off), moderation on input and output, bot protection.
- Quality gate before public launch: an evaluation set of fixed test questions, identical for every party, checked for hallucinations and imbalance.

Out of scope for the MVP: pre-generated theme comparisons (first post-launch feature), shareable conversation links, accounts, candidate data, analytics, translated programmes, PWA.

## Content

```
content/
  puolueet/
    <slug>/            # lowercase official party abbreviation, e.g. kok, sd, vihr
      meta.yml         # names (fi/sv/en), abbreviation, source URL, version date
      fi.md            # programme as published by the party
      sv.md            # only if the party itself published a Swedish version
```

- Programmes are shown only in languages the party published. Machine-translated programmes are accompanied with a clear disclaimer that the translation has not been verified by a human. The agent answers in the visitor's language but quotes the original.
- A unified/remark pipeline assigns every heading and paragraph a stable ID (e.g. `kok-fi-3-2`). The same tree produces the prerendered HTML and `chunks.json`. Anchor IDs must stay stable across rebuilds when the text has not changed.
- Embeddings are generated by a separate script, cached by content hash and committed, so deploys do not re-embed. They are loaded in memory; no vector database.
- Each programme version is one commit. Pages show the version date and link to the original PDF.
- Party programmes are the parties' copyright, not covered by the code licence.

## Stack

- SvelteKit + TypeScript, `adapter-node`, deployed on Clever Cloud (see README for deployment).
- Paraglide JS for i18n. UI strings live in `messages/`. English uses British spelling; Swedish is Finland-Swedish.
- Static pages (programmes, about, privacy) are prerendered.
- The chat is a `+server.ts` endpoint that streams the Mistral response.
- Secrets (e.g. `MISTRAL_API_KEY`) come from `$env/static/private` or `$env/dynamic/private` and never reach the client.
- The system prompt lives in the repository as a single file and is rendered on the about page from that same file.
- No database, no auth library, no Tailwind.

## Testing

Vitest covers the parts where silent breakage would corrupt citations or balance:

- Markdown parsing and anchor-ID stability
- chunking
- per-party retrieval
- citation link generation

Run `npm run test`, `npm run lint` and `npm run check` before considering work done.

## Timeline

| Period            | Phase                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------- |
| Oct – Nov 2026    | Foundation: content pipeline, anchors, programme pages (2023 programmes as test data) |
| Nov – Dec 2026    | Chat: retrieval, streaming, citations, safeguards, first evaluation set               |
| Jan 2027          | MVP finish: about, privacy, WCAG AA check, UI translations, closed beta               |
| Feb – Mar 2027    | Swap in the 2027 programmes as parties publish; public launch once most have          |
| Apr 2027          | Peak traffic around advance voting; monitor and correct fast                          |
| After 18 Apr 2027 | Freeze or switch off the chat, archive                                                |

Accessibility (WCAG 2.2 AA) is a requirement from the start, not a January clean-up task.
