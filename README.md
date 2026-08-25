# mikromidas

A Norwegian (bokmål) crime novel written one chapter per day by a **local LLM
running on a Raspberry Pi 5** — no cloud, no API. This repo is the public half:
the chapters themselves and the Astro site that publishes them.

**Read it:** https://larseliassen.github.io/mikromidas

```
mikromidas/
├── chapters/     kapittel-NNN.md — one per day, committed by the Pi
├── web/          Astro site
└── .github/workflows/deploy.yml
```

Each morning at 06:00 Europe/Oslo the Pi wakes up, writes the next chapter, and
pushes it here. This workflow then rebuilds the site.

The mystery is **improvised** — there is no predetermined solution. A rotating
"director beat" nudges the story so it escalates and pays off instead of
wandering. Long-range coherence comes from a compressed notebook (synopsis,
characters, clues, timeline, rolling recap) rather than from feeding old
chapters back into the model's small context window.

The notebook is deliberately **not** published here: it contains the planted
clues and red herrings, so it would spoil the story as it is being written. It
and the appliance's NixOS configuration live in a separate private repo.

> Chapters are raw model output, committed unedited — including the early ones,
> which are rough. That is the point of the experiment, not an oversight.

## Local preview

```bash
cd web
mkdir -p src/content && ln -sfn ../../../chapters src/content/kapitler
npm install && npm run dev
```
