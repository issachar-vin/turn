export type PhaseId = 'mist' | 'preparation' | 'war';

export type ConditionKind =
  | 'skip-season' // "skip during season 1"
  | 'season-only' // "seasons 2-3 only"
  | 'player-count'
  | 'mode' // catch-up, asymmetric, deterministic
  | 'situational'; // "if a Mythical Beast is revealed"

export interface Condition {
  kind: ConditionKind;
  /** Rendered verbatim on the veiled pill. */
  label: string;
  /** Machine-readable, for the future session tracker (plan §9). */
  seasons?: number[];
  players?: number[];
}

export type Block =
  | { type: 'text'; content: string }
  | { type: 'list'; ordered: boolean; items: ListItem[] }
  | { type: 'table'; caption?: string; headers: string[]; rows: string[][] }
  | { type: 'callout'; tone: CalloutTone; content: string }
  | { type: 'figure'; src: string; alt: string; caption?: string; width: number; height: number }
  | { type: 'branch'; options: BranchOption[] };

export type CalloutTone = 'note' | 'grail' | 'warning';

/** A list item is either a plain string or a string with nested blocks under it. */
export type ListItem = string | { content: string; blocks: Block[] };

export interface BranchOption {
  label: string;
  blocks: Block[];
}

export interface Step {
  /** Stable slug. Doubles as the scroll anchor and the tracker's checklist key. */
  id: string;
  /** "01" */
  label: string;
  title: string;
  /** Presence ⇒ rendered inside the Veiled container. */
  condition?: Condition;
  blocks?: Block[];
  substeps?: Step[];
}

export interface Section {
  id: string;
  /** Phase sections carry a PhaseId; the endgame section is gold-accented. */
  phase?: PhaseId;
  ordinal: number | null;
  name: string;
  tagline: string;
  note?: string;
  steps: Step[];
}

export interface FlowNode {
  id: string;
  /** Anchors the node to a section for scroll-to, and colors it. */
  phase?: PhaseId;
  label: string;
  detail: string;
  /** Section id this node scrolls to. */
  target: string;
}

export interface Game {
  slug: string;
  title: string;
  subtitle: string;
  players: string;
  playtime: string;
  cover: string;
  coverWidth: number;
  coverHeight: number;
  accent: string;
  /** Hero season-flow diagram. */
  overview: FlowNode[];
  sections: Section[];
  quickReference: { title: string; blocks: Block[] };
}
