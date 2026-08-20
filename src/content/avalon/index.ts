import type { Game } from '../types';
import { mistPhase } from './mist';
import { preparationPhase } from './preparation';
import { warPhase } from './war';
import { endgameSection } from './endgame';
import { iconGlossary } from './glossary';

export const avalon: Game = {
  slug: 'avalon',
  title: 'Avalon',
  subtitle: 'The Riven Veil',
  players: '2–4 players',
  playtime: '2 or 3 seasons',
  cover: '/images/avalon-cover.webp',
  coverWidth: 643,
  coverHeight: 631,
  accent: 'var(--mist-core)',
  overview: [
    {
      id: 'flow-mist',
      phase: 'mist',
      label: 'Mist',
      detail: 'Season setup',
      target: 'mist-phase',
    },
    {
      id: 'flow-preparation',
      phase: 'preparation',
      label: 'Preparation',
      detail: '3 rounds',
      target: 'preparation-phase',
    },
    {
      id: 'flow-war',
      phase: 'war',
      label: 'War',
      detail: 'Battles',
      target: 'war-phase',
    },
    {
      id: 'flow-end',
      label: 'End of Season',
      detail: 'Loop or score',
      target: 'end-of-season',
    },
  ],
  sections: [mistPhase, preparationPhase, warPhase, endgameSection],
  quickReference: {
    title: 'Tiebreaker Order',
    blocks: [
      { type: 'text', content: 'Used throughout the game, in this order:' },
      {
        type: 'list',
        ordered: true,
        items: [
          'The Holy Grail bearer may break the tie — once per season.',
          'The player with the lowest VPs.',
          'The player with the lowest VP value printed on their Lord Board.',
        ],
      },
    ],
  },
  glossary: {
    title: 'Icon Glossary',
    entries: iconGlossary,
  },
};
