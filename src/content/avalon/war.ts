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
      id: 'start-of-the-war-phase',
      label: '01',
      title: 'Start of the War Phase',
      blocks: [{ type: 'text', content: 'Settle these before the first region is resolved.' }],
      substeps: [
        {
          id: 'claim-excalibur',
          label: 'a',
          title: 'Claim Excalibur',
          blocks: [
            {
              type: 'text',
              content:
                'If Excalibur has not been claimed yet this season, the player with more Favor than every other player claims it now.',
            },
            {
              type: 'callout',
              tone: 'warning',
              content:
                'If two or more players tie for the most Favor, nobody claims Excalibur — and a Lord holding it from the previous season returns it to its place next to the Favor Track.',
            },
            {
              type: 'callout',
              tone: 'note',
              content:
                'Excalibur can also be claimed earlier: the first player to reach the end of the Favor Track takes it, as long as there is no tie. The bearing Lord gains +2 strength, and once per season may add +1 strength to any one battle where they tie for 1st place.',
            },
          ],
        },
        {
          id: 'reset-favor-track',
          label: 'b',
          title: 'Reset the Favor Track',
          blocks: [
            {
              type: 'text',
              content: 'Move every Favor Marker back to 0, whether or not Excalibur was claimed.',
            },
            {
              type: 'callout',
              tone: 'note',
              content:
                'Favor earned later in the War Phase stays on the track and carries into the next season.',
            },
          ],
        },
        {
          id: 'gain-the-green-knight',
          label: 'c',
          title: 'Gain the Green Knight',
          condition: {
            kind: 'mode',
            label: 'Catch-Up Mechanisms only',
          },
          blocks: [
            {
              type: 'text',
              content:
                'If at least 2 star spaces on the VP Track sit between the last place player and the next lowest player — ignoring the spaces the Markers themselves are on — the last place player gains the Green Knight for this War Phase. They take the Green Knight Card and place the miniature in any region that holds an enemy Hero.',
            },
            {
              type: 'callout',
              tone: 'warning',
              content: 'If there is a tie for last place, nobody gains the Green Knight.',
            },
            {
              type: 'callout',
              tone: 'note',
              content:
                'The Green Knight counts as a Unit, but not against the limit of one bonded Mythical Beast per season. Control ends when the War Phase does.',
            },
          ],
        },
      ],
    },
    {
      id: 'region-order',
      label: '02',
      title: 'Resolve Regions In Order',
      blocks: [
        {
          type: 'figure',
          src: '/images/war-region-order.webp',
          alt: 'The nine regions of the board numbered 1 through 9, with arrows tracing the fixed War Phase resolution order.',
          caption: 'Resolve regions 1 → 9 in this order.',
          width: 431,
          height: 441,
        },
        {
          type: 'text',
          content:
            'For each explored region where any player has strength, in that order, work through the battle and scoring below.',
        },
      ],
    },
    {
      id: 'determine-the-battle',
      label: '03',
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
      label: '04',
      title: 'Non-Hero Battle',
      condition: {
        kind: 'situational',
        label: 'No Lord or Champion on either side',
      },
      blocks: [
        {
          type: 'text',
          content:
            "Sum each faction's total strength from Units, Settlements and Abilities, then compare directly. Skip to Score the Region.",
        },
        {
          type: 'callout',
          tone: 'note',
          content:
            'No Artifact strength applies here — with no Lord or Champion in the region there is no Hero to bear an Artifact.',
        },
      ],
    },
    {
      id: 'hero-battle',
      label: '05',
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
      label: '06',
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
      label: '07',
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
      label: '08',
      title: 'Discard Battle Cards',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            '**1st place:** discard your Battle Plan and all Bonus Cards you played.',
            '**Any other position** and your Battle Plan failed: discard the Battle Plan, regain all Bonus Cards.',
            '**Any other position** and your Battle Plan did not fail: regain the Battle Plan and all Bonus Cards.',
            'If a Battle Plan says to discard it as part of its effect, discard it.',
          ],
        },
      ],
    },
  ],
};
