import type { Section } from '../types';

export const warPhase: Section = {
  id: 'war-phase',
  phase: 'war',
  ordinal: 3,
  name: 'War Phase',
  tagline: 'Battles & scoring',
  note: 'Battles and scoring resolve region by region, in a fixed order.',
  steps: [
    {
      id: 'region-order',
      label: '01',
      title: 'Resolve Regions In Order',
      blocks: [
        {
          type: 'figure',
          src: '/images/war-region-order.webp',
          alt: 'The nine regions of the board numbered 1 through 9, with arrows tracing the fixed War Phase resolution order.',
          caption: 'Resolve regions 1 → 9 in this order.',
          width: 900,
          height: 900,
        },
        {
          type: 'text',
          content:
            'For each explored region with any Unit present, in that order, work through the battle and scoring below.',
        },
      ],
    },
    {
      id: 'determine-the-battle',
      label: '02',
      title: 'Determine the Battle',
      blocks: [
        {
          type: 'branch',
          options: [
            {
              label: 'One faction has strength',
              blocks: [
                {
                  type: 'text',
                  content:
                    'No battle. That player scores 1st place immediately — skip to Score the Region.',
                },
              ],
            },
            {
              label: 'Two or more factions have strength',
              blocks: [
                {
                  type: 'text',
                  content:
                    'A battle happens. Which kind depends on whether a Lord or Champion is present.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'non-hero-battle',
      label: '03',
      title: 'Non-Hero Battle',
      condition: {
        kind: 'situational',
        label: 'No Lord or Champion on either side',
      },
      blocks: [
        {
          type: 'text',
          content:
            "Sum each faction's total strength from Units, Settlements, Artifacts and Abilities, then compare directly. Skip to Score the Region.",
        },
      ],
    },
    {
      id: 'hero-battle',
      label: '04',
      title: 'Hero Battle',
      condition: {
        kind: 'situational',
        label: 'A Lord or Champion is present',
      },
      substeps: [
        {
          id: 'calculate-starting-strength',
          label: '01',
          title: 'Calculate Starting Strength',
          blocks: [
            {
              type: 'text',
              content: 'Each player marks their base strength on the Strength Track.',
            },
          ],
        },
        {
          id: 'choose-battle-plan-and-bonus-cards',
          label: '02',
          title: 'Choose Battle Plan + Bonus Cards',
          blocks: [
            {
              type: 'text',
              content:
                'Players with a Hero simultaneously pick up to 1 Battle Plan Card and up to 3 Bonus Cards.',
            },
            {
              type: 'callout',
              tone: 'note',
              content: 'Each Bonus Card raises the strength Limit by 1.',
            },
          ],
        },
        {
          id: 'reveal-battle-plans-and-limits',
          label: '03',
          title: 'Reveal Battle Plans and Limits',
          blocks: [{ type: 'text', content: 'All players reveal simultaneously.' }],
        },
        {
          id: 'draw-combat-cards',
          label: '04',
          title: 'Draw Combat Cards',
          blocks: [
            {
              type: 'text',
              content:
                "Draw one card at a time from the Main Decks, highest strength player first; ties use the normal tiebreak order. Try not to exceed the Battle Plan's Limit.",
            },
            {
              type: 'callout',
              tone: 'warning',
              content: 'You may stop at any time, but you cannot reject a card once drawn.',
            },
          ],
        },
        {
          id: 'reveal-combat-cards',
          label: '05',
          title: 'Reveal Combat Cards',
          blocks: [
            {
              type: 'text',
              content: 'Simultaneously flip all drawn Combat Cards face up.',
            },
          ],
        },
        {
          id: 'determine-success-or-failure',
          label: '06',
          title: 'Determine Success or Failure',
          blocks: [
            {
              type: 'text',
              content:
                'Total Combat Card strength at or under the Limit succeeds. Over the Limit fails.',
            },
          ],
        },
        {
          id: 'resolve-battle-plans-and-gain-strength',
          label: '07',
          title: 'Resolve Battle Plans and Gain Strength',
          blocks: [
            {
              type: 'branch',
              options: [
                {
                  label: 'Success',
                  blocks: [
                    {
                      type: 'text',
                      content:
                        'Add the full Combat Card total to your strength. All Battle Plan effects resolve.',
                    },
                  ],
                },
                {
                  label: 'Failure',
                  blocks: [
                    {
                      type: 'text',
                      content:
                        "Add half the Battle Plan's printed Limit instead, rounded up. Battle Plan effects do not resolve.",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'score-the-region',
      label: '05',
      title: 'Score the Region',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            '1st place, the highest strength: the full season VP amount for that region.',
            '2nd place: half the VP amount, rounded up — only if there is no tie for 1st.',
            'Tie for 1st: all tied players score the full 1st-place VP, and no one scores 2nd.',
            'Tie for 2nd with no tie for 1st: all tied players score half VP.',
            'Sole player present: the full VP amount, no battle.',
          ],
        },
      ],
    },
    {
      id: 'gain-artifacts',
      label: '06',
      title: 'Gain Artifacts',
      condition: {
        kind: 'situational',
        label: 'If the region holds an Artifact',
      },
      blocks: [
        {
          type: 'text',
          content:
            'The 1st place winner takes it. Equip it if their Hero has an open slot, otherwise it sits by their Faction or Lord Board.',
        },
      ],
    },
    {
      id: 'discard-battle-cards',
      label: '07',
      title: 'Discard Battle Cards',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'Won: discard the Battle Plan and all Bonus Cards.',
            'Lost and the Battle Plan failed: discard the Battle Plan, keep the Bonus Cards.',
            'Lost but the Battle Plan succeeded, and you placed neither 1st nor 2nd: keep the Battle Plan and the Bonus Cards.',
          ],
        },
      ],
    },
  ],
};
