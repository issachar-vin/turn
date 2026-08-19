import type { Section } from '../types';

export const preparationPhase: Section = {
  id: 'preparation-phase',
  phase: 'preparation',
  ordinal: 2,
  name: 'Preparation Phase',
  tagline: '3 rounds',
  note: 'Each round is Part 1 (Choose a Card), then Part 2 (Reveal & Resolve). Repeat both parts for a total of 3 rounds.',
  steps: [
    {
      id: 'part-1-choosing-a-card',
      label: 'Part 1',
      title: 'Choosing a Card',
      blocks: [{ type: 'text', content: 'Simultaneous — all players act at once.' }],
      substeps: [
        {
          id: 'card-selection',
          label: '01',
          title: 'Card Selection',
          blocks: [
            {
              type: 'text',
              content:
                'Each player picks 1 card from hand and places it face up at the front of their hand.',
            },
          ],
        },
        {
          id: 'pay-the-card-cost',
          label: '02',
          title: 'Pay the Card Cost',
          blocks: [
            {
              type: 'text',
              content:
                'Place the required cards behind the chosen card. Apply any cost reductions first.',
            },
          ],
        },
        {
          id: 'place-card-separator',
          label: '03',
          title: 'Place Card Separator',
          blocks: [
            {
              type: 'text',
              content:
                'Place the separator behind the cards being played and spent, dividing them from the rest of your hand.',
            },
          ],
        },
      ],
    },
    {
      id: 'part-2-reveal-and-resolve',
      label: 'Part 2',
      title: 'Reveal and Resolve',
      blocks: [{ type: 'text', content: 'Turn-based — resolved in initiative order.' }],
      substeps: [
        {
          id: 'card-reveal',
          label: '01',
          title: 'Card Reveal',
          blocks: [
            {
              type: 'text',
              content:
                'All players reveal their chosen card and the cards paid, then announce their initiative value — the number in the top-left corner.',
            },
          ],
        },
        {
          id: 'determine-turn-order',
          label: '02',
          title: 'Determine Turn Order',
          blocks: [
            {
              type: 'text',
              content: 'Highest initiative goes first, then descending. Ties break in this order:',
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'Holy Grail bearer (once per season).',
                'Lowest VPs.',
                'Lowest VP value printed on the Lord Board.',
              ],
            },
            {
              type: 'callout',
              tone: 'note',
              content:
                'The current tiebreaker picks their own position in the order, but cannot take a spot already claimed.',
            },
          ],
        },
        {
          id: 'player-turns',
          label: '03',
          title: 'Player Turns',
          blocks: [
            { type: 'text', content: 'In initiative order, highest to lowest.' },
            {
              type: 'branch',
              options: [
                {
                  label: 'Resolve your Card',
                  blocks: [
                    {
                      type: 'text',
                      content: 'Resolve the chosen Card, left to right and top to bottom.',
                    },
                  ],
                },
                {
                  label: 'Standard Action',
                  blocks: [
                    { type: 'text', content: 'Perform a Standard Action instead of the Card.' },
                  ],
                },
              ],
            },
            {
              type: 'callout',
              tone: 'note',
              content:
                'Resolve your Card and any Abilities in **whichever order you like** — but finish every effect of one before starting the next.',
            },
            {
              type: 'callout',
              tone: 'warning',
              content:
                "The exceptions are 'if' and 'when' effects, such as 'if you deploy' or 'when you explore'. Those trigger the moment their requirement is met, even part-way through resolving something else.",
            },
          ],
          substeps: [
            {
              id: 'use-abilities',
              label: 'a',
              title: 'Use Abilities',
              blocks: [
                {
                  type: 'text',
                  content:
                    'Use any number of Abilities and Reaction Abilities. Each may be used once per season.',
                },
              ],
            },
            {
              id: 'exploring-a-region',
              label: 'b',
              title: 'Exploring a Region',
              condition: {
                kind: 'situational',
                label: 'If your Lord enters or starts its turn in an unexplored region',
              },
              blocks: [
                {
                  type: 'callout',
                  tone: 'warning',
                  content:
                    '**Immediately pause the action or effect you were resolving** and explore the region now. Finish the exploration, then pick up where you left off.',
                },
                {
                  type: 'list',
                  ordered: true,
                  items: [
                    'Flip the region tile face up, if it is face down.',
                    'Pick 1 exploration reward printed above the region name — even if the tile was already face up.',
                    {
                      content: 'Reveal the Mist Card.',
                      blocks: [
                        {
                          type: 'branch',
                          options: [
                            {
                              label: 'Artifact revealed',
                              blocks: [
                                {
                                  type: 'text',
                                  content:
                                    'Nothing happens now. It stays face up in the region until the War Phase.',
                                },
                              ],
                            },
                            {
                              label: 'Mythical Beast revealed',
                              blocks: [
                                {
                                  type: 'text',
                                  content:
                                    'Interrupt again and resolve the Bonding bid before going any further.',
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    'Return to resolving the rest of your turn.',
                  ],
                },
                {
                  type: 'callout',
                  tone: 'note',
                  content: 'You may only explore once per turn, no matter how many Lords you have.',
                },
              ],
            },
            {
              id: 'end-of-turn-actions',
              label: 'c',
              title: 'End of Turn Actions',
              blocks: [
                {
                  type: 'list',
                  ordered: true,
                  items: [
                    'Discard the resolved Card and any cards used to pay for it.',
                    'Draw 2 cards from any of the 4 Main Decks, in any combination.',
                    'Check Region Limits — 5 Units per player per region. Return any excess Units to your supply.',
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
