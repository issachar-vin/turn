# turn

Interactive board game player aids. Built to hold many games; the first is
**Avalon: The Riven Veil**.

Design and build plan: [plan.md](plan.md).

## Stack

Vite · React 19 · TypeScript · Tailwind v4 · Motion · React Router

## Commands

```bash
make setup    # npm install
npm run dev   # vite dev server on :5173
make dev      # same, in docker
make lint     # oxlint + tsc
make format   # prettier
make test     # production build
```

## Content

Game content lives in typed TS modules under `src/content/`, transcribed from
`resources/TurnOrderPlayerAid.md`. Adding a game means adding a content module
and registering it in `src/content/games.ts` — no component changes.

The rulebook PDFs in `resources/` are publisher copyright and are gitignored;
they are local reference only and are never shipped by the app.
