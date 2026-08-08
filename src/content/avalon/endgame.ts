import type { Section } from '../types';

/** Non-phase section: gold-accented rather than phase-colored (plan §8). */
export const endgameSection: Section = {
  id: 'end-of-season',
  ordinal: null,
  name: 'End of Season',
  tagline: 'Close out, then loop or score',
  steps: [
    {
      id: 'discard-hand',
      label: '01',
      title: 'Discard Your Hand',
      blocks: [
        {
          type: 'text',
          content: 'Each player discards all remaining cards in hand, gaining 1 VP per card.',
        },
      ],
    },
    {
      id: 'reset-favor-track',
      label: '02',
      title: 'Reset the Favor Track',
      blocks: [{ type: 'text', content: 'Reset the Favor Track to 0 for all players.' }],
    },
    {
      id: 'season-loop',
      label: '03',
      title: 'Next Season or End Game',
      blocks: [
        {
          type: 'branch',
          options: [
            {
              label: 'A season remains',
              blocks: [{ type: 'text', content: 'Return to the Mist Phase and begin it.' }],
            },
            {
              label: 'That was the final season',
              blocks: [{ type: 'text', content: 'Proceed to End Game Scoring.' }],
            },
          ],
        },
      ],
    },
    {
      id: 'ending-the-game',
      label: '04',
      title: 'Ending the Game',
      blocks: [
        {
          type: 'text',
          content:
            'Triggered after the final season — the 2nd or the 3rd, per the game length chosen at setup.',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'Each player gains VPs from their revealed Settlement slots one last time.',
            'Most VPs wins.',
          ],
        },
        {
          type: 'callout',
          tone: 'grail',
          content:
            'Ties are broken by the Holy Grail bearer, who wins. If no one holds the Grail, all tied players win.',
        },
      ],
    },
  ],
};
