# Player Aid Site — Design & Build Plan

A React site hosting interactive board game player aids. First and only game at launch:
**Avalon: The Riven Veil**.

Source of truth for Avalon content: `resources/TurnOrderPlayerAid.md`.
Visual reference: `resources/AvalonRuleBook(Core).pdf`.

---

## 1. Product

### Goal
A player aid you actually reach for mid-game. Fast to scan on a phone in dim
lighting, pretty enough to be worth opening on a laptop.

### Scope (v1)
- Home: grid of game cards. One card (Avalon), built to scale to many.
- Avalon detail: hero season-flow overview, then the full turn order as a
  scroll timeline with a sticky phase rail.
- Static reference. No session state.

### Explicit non-goals (v1)
- No session/turn tracker. Architected for it (see §9), not built.
- No search, no auth, no backend.

---

## 2. Design Language

Pulled from the rulebook. Three things define it:

1. **Deep field, gold hairline.** Every rulebook spread is a dark or saturated
   field bounded by thin gold celtic filigree. Ornament is *edge* ornament — it
   frames, it never fills.
2. **Hard phase color-coding.** The rulebook borders change color per phase.
   Mist = glacial blue. Preparation = emerald. War = crimson. This is the
   strongest navigational signal in the book and we inherit it wholesale.
3. **Mist as the atmosphere.** The cover is aurora-lit cloud — cyan, violet,
   rose. It is the game's identity and our background treatment.

**Chosen intensity: atmospheric but restrained.** Gold filigree on section
headers only. Soft phase-colored glows. One slow mist gradient behind the hero.
Motion is purposeful, never decorative-only.

---

## 3. Color

All tokens as CSS custom properties in `src/styles/tokens.css`, consumed by
Tailwind v4's `@theme`.

### Base

| Token | Value | Use |
|---|---|---|
| `--bg-void` | `#070B14` | Page background, deepest layer |
| `--bg-base` | `#0A0F1C` | Default surface |
| `--bg-raised` | `#111A2E` | Cards, panels |
| `--bg-overlay` | `#16203A` | Hover, sticky bars, popovers |
| `--border-hair` | `#1E2A46` | Default 1px dividers |
| `--border-gold` | `#C9A227` | Filigree, section rules |
| `--border-gold-dim` | `#6B551A` | Filigree at rest / low emphasis |

### Text

| Token | Value | Contrast on `--bg-base` |
|---|---|---|
| `--text-primary` | `#EDEFF5` | 16.8:1 |
| `--text-secondary` | `#A5AFC4` | 8.1:1 |
| `--text-muted` | `#6C7891` | 4.6:1 — meta only, never body |
| `--text-gold` | `#E8CE7A` | 11.2:1 — eyebrows, numerals |

### Phase accents

Each phase carries a triad: `-core` (fills, chips), `-glow` (shadows, auras),
`-text` (accent text on dark, contrast-checked ≥ 4.5:1).

| Phase | `-core` | `-glow` | `-text` |
|---|---|---|---|
| Mist | `#4C9BE8` | `rgba(76,155,232,.28)` | `#7FC4F5` |
| Preparation | `#3FA96B` | `rgba(63,169,107,.28)` | `#6FD99A` |
| War | `#C4353F` | `rgba(196,53,63,.30)` | `#F08A8F` |

Applied via a `data-phase` attribute on each section; a single CSS rule maps
`data-phase="mist"` → `--phase-core: var(--mist-core)` etc. Components then only
ever reference `--phase-*`, so a phase section is themed by one attribute.

### Mist / aurora (hero + veiled steps only)

`--mist-cyan #5FD3E3` · `--mist-violet #8B7BD8` · `--mist-rose #E88FB0`

### Semantic

`--grail #E8CE7A` (Holy Grail references) · `--note #7FC4F5` ·
`--danger #F08A8F`

### Dark only
The site is dark-only by design — it matches the rulebook and it is what you
want at a game table at night. Tokens are structured so a light theme is a
token-file swap, but v1 ships one theme and declares it explicitly.

---

## 4. Typography

**Cinzel** (display) + **Inter** (body/UI). Both self-hosted woff2, latin
subset, `font-display: swap`. Preload Cinzel 600 and Inter 400/600 variable.

Cinzel is Roman inscriptional capitals — carries the Arthurian weight without
blackletter's small-size legibility problem. Blackletter is not used anywhere.

### Scale (fluid via `clamp`)

| Role | Font | Size | Weight | Tracking | Leading |
|---|---|---|---|---|---|
| Display | Cinzel | `clamp(2.5rem, 8vw, 5rem)` | 700 | `.12em` | 1.05 |
| Phase title | Cinzel | `clamp(1.75rem, 4vw, 2.75rem)` | 600 | `.08em` | 1.15 |
| Section | Cinzel | `1.25rem` | 600 | `.06em` | 1.3 |
| Eyebrow | Inter | `.75rem` | 600 | `.14em` uppercase | 1.4 |
| Step title | Inter | `1.0625rem` | 600 | `0` | 1.35 |
| Body | Inter | `1rem` | 400 | `0` | 1.65 |
| Body small | Inter | `.9375rem` | 400 | `0` | 1.6 |
| Meta | Inter | `.8125rem` | 500 | `.02em` | 1.45 |
| Numeral | Cinzel | `.875rem` | 700 | `.06em` | 1 |

Rules:
- Cinzel is **always** uppercase or title-case display. Never body copy.
- Body copy max width `68ch`.
- Step numerals (`01`, `02`) use Cinzel with tabular alignment for a clean rail.

---

## 5. Space, Shape, Elevation

**Spacing** — 4px base: `4 8 12 16 20 24 32 40 48 64 80 96 128`

**Radii** — `sm 6px` (chips, badges) · `md 12px` (step cards) · `lg 20px`
(phase panels, game cards) · `full` (pills)

**Elevation** — no heavy drop shadows. Depth comes from surface value + a
1px hairline + an optional phase glow.

| Level | Recipe |
|---|---|
| 0 | `--bg-base` |
| 1 | `--bg-raised` + `1px --border-hair` |
| 2 | `--bg-overlay` + `1px` phase-tinted border + `0 0 0 1px` inner highlight |
| Focus | `0 0 0 2px --bg-base, 0 0 0 4px --phase-core` |

**Filigree** — a single reusable inline SVG (celtic knot terminal + hairline
rule) used only as: phase section header rule, hero divider, footer cap. Drawn
in `--border-gold-dim`, animating to `--border-gold` on section enter. Never
per-card.

---

## 6. Motion

Library: **Motion** (Framer Motion).

| Token | Value |
|---|---|
| `--dur-micro` | 150ms |
| `--dur-standard` | 250ms |
| `--dur-entrance` | 400ms |
| `--dur-hero` | 800ms |
| `--ease-standard` | `cubic-bezier(.22, 1, .36, 1)` |
| `--ease-emphasized` | `cubic-bezier(.16, 1, .3, 1)` |

### Named motions
- **Step reveal** — on scroll into view: `opacity 0→1`, `y 16→0`, 400ms
  emphasized, **60ms stagger** down the list. Fires once (`viewport.once`).
- **Rail track** — active phase dot scales `1→1.35` and gains its phase glow;
  the connecting line fills with `--phase-core` via `scaleY`. Driven by
  `useScroll` progress, not per-step listeners.
- **Phase handoff** — as the rail crosses into a new phase, the page's
  `--phase-core` transitions over 600ms, so background glow and accents wash
  from blue → green → red as you scroll the season. This is the signature
  moment of the page.
- **Card hover** (home grid) — `scale 1.02`, border to `--phase-core`, glow
  fades in, 250ms standard. Cover image `scale 1.06` inside `overflow-hidden`.
- **Accordion** — height auto via layout animation, 250ms standard.
- **Mist drift** — hero only. Two layered radial gradients on slow
  `translate3d` + `scale` loops (40s and 60s, offset). CSS keyframes, no JS,
  no canvas. `animation-play-state: paused` when the hero leaves the viewport
  via an `IntersectionObserver`-set class.
- **Veiled shimmer** — conditional-step containers get a very slow (12s)
  gradient sweep across their mist background at ~6% opacity.

### Reduced motion
`@media (prefers-reduced-motion: reduce)` — all transforms and loops removed;
reveals become instant opacity, phase handoff becomes an instant swap. A single
`useReducedMotion()` guard feeds Motion variants; CSS loops are killed in the
media query.

---

## 7. Layout & Screens

### 7.1 Home — game grid

```
┌────────────────────────────────────────────────────────┐
│  PLAYER AIDS                          (Cinzel, small)  │
│  ─────◆─────                                           │
│                                                        │
│  ┌──────────────┐  ┌ ─ ─ ─ ─ ─ ─ ┐                     │
│  │   [cover]    │    more games                        │
│  │              │    coming soon    (ghost placeholder)│
│  │  AVALON      │  └ ─ ─ ─ ─ ─ ─ ┘                     │
│  │  The Riven   │                                      │
│  │  Veil        │                                      │
│  │  2-4p · 90m  │                                      │
│  └──────────────┘                                      │
└────────────────────────────────────────────────────────┘
```

- Grid: `repeat(auto-fill, minmax(280px, 1fr))`, gap 24px.
- Card: **1:1 cover** (`avalon-cover.webp` is 643×631 — box art is square), then
  a text block beneath it rather than overlaid. The cover's lower third is
  bright cloud with the game's own logotype on it; a scrim + overlaid title
  would fight that artwork and duplicate the title. So: square image on top,
  hairline divider, Cinzel title + Inter meta row below on `--bg-raised`.
- Cards stagger in on mount (60ms).
- One ghost placeholder card communicates the site is a collection.
- Mobile: single column, gap 16px.

### 7.2 Avalon detail — hero

Full-viewport-ish (`min-h: 72svh`, not `100vh` — avoids mobile URL-bar jump).

- Drifting mist gradient background (§6), aurora cyan/violet/rose over
  `--bg-void`.
- Title in Cinzel display, subtitle, meta row (2–4 players · 2 or 3 seasons).
- **Season flow diagram** — the "hero of the md file". Horizontal on desktop,
  vertical on mobile:

```
   MIST  ─────▶  PREPARATION  ─────▶  WAR  ─────▶  END OF SEASON
  season           ×3 rounds          battles        ↻ next season
   setup
```

  Each node is phase-colored, draws in on load (SVG `pathLength` animation on
  the connectors, 800ms hero, staggered), and is a scroll anchor. The loop-back
  arrow from End of Season to Mist is the clearest way to teach the structure.
- Scroll cue at bottom, fades out on first scroll.

### 7.3 Avalon detail — phase timeline

**Desktop (≥1024px)**

```
┌──────────────────────────────────────────────────────────────┐
│ ┌────────┐                                                   │
│ │  ●     │   1 ─ MIST PHASE                                  │
│ │ MIST   │   ────◆────                                       │
│ │  │     │   Season setup. Simultaneous unless noted.        │
│ │  │     │                                                   │
│ │  ○     │   ┌─────────────────────────────────────────────┐ │
│ │ PREP   │   │ 01   Regions Return to the Mists            │ │
│ │  │     │   │      ░░ veiled: skipped in Season 1 ░░      │ │
│ │  │     │   └─────────────────────────────────────────────┘ │
│ │  ○     │   ┌─────────────────────────────────────────────┐ │
│ │ WAR    │   │ 02   Place Mist Cards                       │ │
│ │        │   │      table: players / artifacts / beasts    │ │
│ └────────┘   └─────────────────────────────────────────────┘ │
│  sticky                   max-w 780px                        │
└──────────────────────────────────────────────────────────────┘
```

- Rail: `position: sticky; top: 96px`, ~180px wide, left column of a
  `grid-template-columns: 180px minmax(0, 780px)` centered layout.
- Rail entries are the 3 phases; within the active phase it expands to show
  that phase's step titles as sub-entries.
- Clicking scrolls smoothly to the anchor.

**Mobile (<1024px)**

- Rail becomes a sticky top chip bar (`MIST · PREP · WAR`), 56px tall, blurred
  `--bg-overlay` background, active chip filled with `--phase-core`.
- Content is single column, 16px gutters.
- Step cards are collapsed to title + numeral; tap expands the body.
  Desktop shows bodies expanded by default.
- All tap targets ≥ 44px.

### 7.4 Step card anatomy

```
┌────────────────────────────────────────────┐
│  01   Regions Return to the Mists          │  numeral: Cinzel, phase-text
│  ────────────────────────────────────────  │  hairline
│  Return all Units to owner's supply        │  body
│  except Settlements, Strength Tokens,      │
│  Ley Line Markers.                         │
│                                            │
│  • Reveal remaining Mist Cards…            │  list blocks
└────────────────────────────────────────────┘
   elevation 1, radius md, left 2px phase-core edge accent
```

### 7.5 The Veiled container (conditional content)

The signature component. Any step or block with a `condition` renders inside it.

```
╔════════════════════════════════════════════╗
║ ░░░░░░░░░░ mist gradient background ░░░░░░ ║
║  ◈ SKIPPED DURING SEASON 1                 ║   condition label
║ ░░                                       ░ ║   Inter eyebrow, --mist-cyan
║  01   Regions Return to the Mists          ║
║  ░░ Return all Units to owner's supply ░░  ║
║      except Settlements…                   ║
╚════════════════════════════════════════════╝
```

- Background: layered radial gradients in `--mist-cyan` / `--mist-violet` at
  low alpha over `--bg-raised`, plus the 12s shimmer sweep.
- Border: 1px `--mist-cyan` at 24% alpha, radius md.
- Condition label: pill at top-left, `◈` glyph + uppercase eyebrow, in
  `--mist-cyan`. Text comes from the condition's `label` field, so it reads
  correctly for every kind: "Skipped during Season 1", "Season 2+ only",
  "Catch-up mode only", "If a Mythical Beast is revealed".
- Content inside is at ~88% opacity — present, legible, but visibly shrouded.
  Hover/focus lifts it to 100% and the mist recedes slightly (250ms). This is
  the whole idea: conditional rules are *in the mist* until they apply.

Contrast is verified at the shrouded state, not just at hover — 88% of
`--text-primary` over the mist-tinted surface still clears 4.5:1.

### 7.6 Other content components

- **Table** — used by Mist Card counts and the Unit Strength table. Header row
  in `--text-gold` eyebrow style, hairline row rules, zebra at 3% white.
  Wrapped in `overflow-x: auto` with an edge fade so it never breaks mobile.
- **Branch** — for "Resolve your Card **or** perform a Standard Action" and
  Non-Hero vs Hero Battle. Two side-by-side panels on desktop with a vertical
  `OR` divider between them; stacked with a horizontal `OR` chip on mobile.
- **Callout** — note / grail / warning. Left 2px accent, tinted background,
  small icon.
- **Ordered substeps** — the 7 Hero Battle Steps render as a nested numbered
  list with a connecting vertical hairline, distinct from top-level step cards.
- **Region order figure** — `war-region-order-editted.png` (1024×1024, numbered
  1–9 with red flow arrows). The source has an olive backdrop in the corners
  that would clash with `--bg-void`, so the figure is **circularly masked**
  (`border-radius: 50%`) — the board is inscribed in the square, so the clip
  removes the backdrop entirely and leaves a clean disc. A soft
  `--mist-cyan` outer glow seats it on the dark page. Framed with caption,
  tappable to a lightbox on mobile.
- **Quick Reference tiebreaker** — pinned as a compact card at the end, and
  repeated as a collapsible floating "Tiebreakers" button on mobile since it's
  referenced from three separate places.

---

## 8. Content Data Model

Content lives in typed TS modules (`src/content/`), transcribed from
`TurnOrderPlayerAid.md`. Typed data, not runtime markdown parsing — it gives
each step structured metadata (conditions, tables, branches) and a stable `id`,
which is exactly what the future tracker iterates over.

```ts
type PhaseId = 'mist' | 'preparation' | 'war';

type ConditionKind =
  | 'skip-season'      // "skip during season 1"
  | 'season-only'      // "seasons 2-3 only"
  | 'player-count'
  | 'mode'             // catch-up, asymmetric, deterministic
  | 'situational';     // "if a Mythical Beast is revealed"

interface Condition {
  kind: ConditionKind;
  label: string;              // rendered verbatim on the veiled pill
  seasons?: number[];         // machine-readable, for the future tracker
  players?: number[];
}

type Block =
  | { type: 'text';    content: string }
  | { type: 'list';    ordered: boolean; items: (string | Block[])[] }
  | { type: 'table';   caption?: string; headers: string[]; rows: string[][] }
  | { type: 'callout'; tone: 'note' | 'grail' | 'warning'; content: string }
  | { type: 'figure';  src: string; alt: string; caption?: string }
  | { type: 'branch';  options: { label: string; blocks: Block[] }[] };

interface Step {
  id: string;                 // stable slug, also the scroll anchor
  label: string;              // "01"
  title: string;
  condition?: Condition;      // presence ⇒ Veiled container
  blocks?: Block[];
  substeps?: Step[];
}

interface Phase {
  id: PhaseId;
  ordinal: number;
  name: string;               // "Mist Phase"
  tagline: string;            // "season setup"
  note?: string;              // "3 rounds"
  steps: Step[];
}

interface Game {
  slug: string;
  title: string;
  subtitle: string;
  players: string;
  playtime: string;
  cover: string;
  accent: string;             // grid card accent
  overview: FlowNode[];       // hero season-flow diagram
  phases: Phase[];
  quickReference: Block[];
}
```

Mapping notes for the transcription:
- Preparation Phase's Part 1 / Part 2 split becomes two `Step`s with `substeps`.
- Player Turns' "Resolve your Card **or** Standard Action" becomes a `branch`.
- War Phase's one-faction vs two-faction split becomes a `branch`; Hero Battle's
  7 steps become `substeps`.
- Exploring a region's Artifact/Beast outcomes become a `branch` inside a
  `situational` condition — it renders veiled, which is correct.
- End of Season and Ending the Game become a fourth non-phase section rendered
  after the War Phase, gold-accented rather than phase-colored.

---

## 9. Built for the Future Tracker

v1 ships static, but these choices make the tracker additive rather than a
rewrite:

- Every `Step` has a stable `id` — the tracker's checklist keys.
- `Condition` carries machine-readable `seasons` / `players` alongside the
  human `label`. A pure `isActive(condition, ctx)` is all that's needed to
  swap the veiled treatment for a real dimmed/hidden state.
- Rendering is driven entirely off the content tree, so a `SessionContext`
  (`{ season, players, mode, completedStepIds }`) wraps the page and step cards
  read it optionally.
- The sticky rail already models "current position in the season" — it becomes
  the tracker's progress indicator with no structural change.

Nothing in v1 depends on these; they just cost nothing to leave in place.

---

## 10. Tech & Structure

**Vite + React 19 + TypeScript + Tailwind v4 + Motion + React Router.**

```
src/
  main.tsx
  App.tsx                    routes: /  ·  /avalon
  styles/
    tokens.css               all custom properties
    globals.css              reset, base type, @theme bridge
  content/
    types.ts
    games.ts                 registry
    avalon/
      index.ts
      mist.ts
      preparation.ts
      war.ts
      endgame.ts
  components/
    layout/    SiteHeader, Filigree, PageShell
    home/      GameGrid, GameCard
    game/      GameHero, SeasonFlow, PhaseRail, PhaseSection,
               StepCard, VeiledStep, SubstepList
    blocks/    BlockRenderer, TextBlock, ListBlock, TableBlock,
               CalloutBlock, FigureBlock, BranchBlock
    ui/        Chip, Pill, Accordion, Lightbox
  hooks/
    useActivePhase.ts        scroll → active phase, IntersectionObserver
    usePrefersReducedMotion.ts
public/
  fonts/                     Cinzel + Inter woff2 subsets
  images/                    copied from resources/images/ at scaffold time
```

### Assets

| File | Use |
|---|---|
| `avalon-cover.webp` (643×631) | Home grid card, and the hero's ambient backdrop |
| `war-region-order-editted.png` (1024×1024) | War Phase region order figure |
| `war-region-order.png` | Superseded by the edited version; not shipped |

The cover doubles as the hero background: heavily blurred, scaled up, at ~25%
opacity behind the mist gradients. Its palette *is* the aurora palette, so the
hero and the token set agree by construction rather than by eye.

---

## 11. Performance & Accessibility

**Performance**
- No canvas, no particle system, no WebGL. Mist is CSS gradients on
  GPU-composited transforms only (`transform`/`opacity` — never animating
  `background-position` or filters).
- Mist animation pauses when the hero is off-screen.
- Rail progress driven by one `useScroll` + one `IntersectionObserver`, not
  per-step scroll handlers.
- Step reveals are `whileInView` with `once: true` — no ongoing observers.
- Fonts subset and preloaded; total font payload target < 80KB.
- Route-level code splitting; images lazy with explicit `width`/`height` to
  hold layout.
- Targets: LCP < 2.0s and CLS < 0.05 on mid-tier mobile over 4G.

**Accessibility**
- Semantic `<section>` per phase with `aria-labelledby`; steps are `<article>`.
- Rail is a `<nav>` with `aria-current="true"` on the active phase.
- Mobile accordions are real `<button aria-expanded>` disclosures.
- Veiled containers are **not** `aria-hidden` — the condition label is real
  text read before the content, so screen readers get the condition first.
- Visible focus ring everywhere (§5), keyboard-navigable rail and lightbox
  (Escape closes, focus trapped and restored).
- Full `prefers-reduced-motion` path (§6).
- All text ≥ 4.5:1, including inside veiled containers at rest.

---

## 12. Build Order

1. Scaffold Vite/React/TS/Tailwind v4/Motion/Router; fonts installed.
2. `tokens.css` + `globals.css`; phase `data-phase` theming rule.
3. Content types + full Avalon transcription from the md.
4. Block renderer and all block components.
5. `StepCard` + `VeiledStep`.
6. `PhaseSection` + `PhaseRail` + scroll wiring and phase handoff.
7. `GameHero` + `SeasonFlow` diagram.
8. Home grid.
9. Motion polish, reduced-motion pass.
10. Mobile pass, a11y audit, Lighthouse.

---

## 13. Open Items

- Confirm whether the MW expansion rulebook
  (`resources/AvalonMWRuleBook.pdf`) content is in scope later.
