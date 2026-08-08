import type { Condition, Section } from '../types';

const skipSeason1: Condition = {
  kind: 'skip-season',
  label: 'Skipped during Season 1',
  seasons: [2, 3],
};

export const mistPhase: Section = {
  id: 'mist-phase',
  phase: 'mist',
  ordinal: 1,
  name: 'Mist Phase',
  tagline: 'Season setup',
  note: 'Performed in order, all players simultaneously unless noted.',
  steps: [
    {
      id: 'regions-return-to-the-mists',
      label: '01',
      title: 'Regions Return to the Mists',
      condition: skipSeason1,
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            "Return all Units to their owner's supply, except Settlements, Strength Tokens and Ley Line Markers.",
            'Reveal any remaining Mist Cards and put them at the bottom of their respective deck (Artifacts or Mythical Beasts). If there is an unclaimed Holy Grail card, put it back by the Favor Track.',
            'Remove regions without a Settlement, reshuffle them into the region tile piles, then draw new tiles face down into the empty spaces.',
          ],
        },
      ],
    },
    {
      id: 'place-mist-cards',
      label: '02',
      title: 'Place Mist Cards',
      blocks: [
        {
          type: 'text',
          content:
            'Draw Artifacts and Mythical Beasts (plus the Holy Grail) per player count, shuffle them together, then place one face down in each region.',
        },
        {
          type: 'callout',
          tone: 'note',
          content: 'Skip Deep Mist regions — they receive no Mist Card.',
        },
        {
          type: 'table',
          caption: 'Mist Cards by player count',
          headers: ['Players', 'Artifacts', 'Mythical Beasts', 'Holy Grail'],
          rows: [
            ['2', '2', '2', '1'],
            ['3', '3', '3', '1'],
            ['4+', '4', '4', '1'],
          ],
        },
      ],
    },
    {
      id: 'new-prophecy-cards',
      label: '03',
      title: 'New Prophecy Cards',
      blocks: [
        {
          type: 'text',
          content:
            'Draw X Prophecy Cards, where X is the season number, and place them near the Favor Track.',
        },
      ],
    },
    {
      id: 'reset-abilities',
      label: '04',
      title: 'Reset Abilities',
      condition: skipSeason1,
      blocks: [
        {
          type: 'text',
          content: 'Return all Faction Cubes spent on ability use to your supply.',
        },
      ],
    },
    {
      id: 'gain-settlement-bonuses',
      label: '05',
      title: 'Gain Settlement Bonuses',
      condition: skipSeason1,
      blocks: [
        {
          type: 'text',
          content:
            'Gain the printed VPs from your visible Settlement slots, then deploy Warriors per the Settlement icon.',
        },
      ],
    },
    {
      id: 'rearrange-artifacts',
      label: '06',
      title: 'Rearrange Artifacts',
      condition: skipSeason1,
      blocks: [
        {
          type: 'text',
          content: 'All players simultaneously reassign their Artifacts to their Heroes.',
        },
      ],
    },
    {
      id: 'draw-cards',
      label: '07',
      title: 'Draw Cards',
      blocks: [
        {
          type: 'text',
          content:
            'Draw 2 cards face down from each of the 4 Main Decks: Deploy, Move, Settle and Battle Plan.',
        },
      ],
    },
  ],
};
