import type { GlossaryEntry } from '../types';

/**
 * Terminology icons, transcribed from the Avalon core rulebook (p. 13) and
 * kept in that page's reading order — down each column, then left to right.
 */
export const iconGlossary: GlossaryEntry[] = [
  {
    id: 'unexplored-region',
    name: 'Unexplored Region',
    icon: '/images/icons/unexplored-region.png',
    description:
      'A region Tile with a face down Mist Card on it. Can be either a Region Tile that is flipped face down or a revealed region. Unexplored regions have no region type, Units in them provide no strength and do not count towards any prophecy completion requirements.',
  },
  {
    id: 'explored-region',
    name: 'Explored Region',
    icon: '/images/icons/explored-region.png',
    description:
      'A Region Tile that is flipped face up and does not have a face down Mist Card on it.',
  },
  {
    id: 'forest-region',
    name: 'Forest Region',
    icon: '/images/icons/forest-region.png',
    description: 'A region with a forest terrain icon.',
  },
  {
    id: 'mountain-region',
    name: 'Mountain Region',
    icon: '/images/icons/mountain-region.png',
    description: 'A region with a mountain terrain icon.',
  },
  {
    id: 'river-region',
    name: 'River Region',
    icon: '/images/icons/river-region.png',
    description: 'A region with a river terrain icon.',
  },
  {
    id: 'coastal-regions',
    name: 'Coastal Regions',
    icon: '/images/icons/coastal-regions.png',
    description: 'The four coastal regions of Avalon.',
  },
  {
    id: 'inner-regions',
    name: 'Inner Regions',
    icon: '/images/icons/inner-regions.png',
    description: 'The four inner regions of Avalon.',
  },
  {
    id: 'center-region',
    name: 'Center Region',
    icon: '/images/icons/center-region.png',
    description: 'The central region of Avalon.',
  },
  {
    id: 'quadrant',
    name: 'Quadrant',
    icon: '/images/icons/quadrant.png',
    description:
      'A set of 3 regions that can be chosen from. Perspective is based on the N,E,S,W on the Game Board: N is upwards, E is Right, S is downwards, and W is left.',
  },
  {
    id: 'to-icon',
    name: '‘To’ Icon',
    icon: '/images/icons/to-icon.png',
    description:
      'This arrow indicates that what comes before this arrow must go ‘to’ whatever comes after it. Example Settle ‘To’ an inner region.',
  },
  {
    id: 'ability',
    name: 'Ability',
    icon: '/images/icons/ability.png',
    description:
      'An additional effect that can be activated once per season in a player’s turn during the Preparation Phase.',
  },
  {
    id: 'reaction-ability',
    name: 'Reaction Ability',
    icon: '/images/icons/reaction-ability.png',
    description:
      'An effect that follows the normal rules for an ability but can be activated whenever the condition is met, even outside of the player’s turn.',
  },
  {
    id: 'passive',
    name: 'Passive',
    icon: '/images/icons/passive.png',
    description:
      'An effect that is always active during the game. Unless it is on an unequipped Artifact.',
  },
  {
    id: 'vps-victory-points',
    name: 'VPs (Victory Points)',
    icon: '/images/icons/vps-victory-points.png',
    description:
      'Whoever has the most VPs at the end of the game wins. Each time a player passes 100 VPs, they place a corresponding VP Token on their Faction Board.',
  },
  {
    id: 'unit',
    name: 'Unit',
    icon: '/images/icons/unit.png',
    description:
      'Any Warrior / Champion / Lord / Mythical Beast that you control. Settlements are not Units.',
  },
  {
    id: 'warrior',
    name: 'Warrior',
    icon: '/images/icons/warrior.png',
    description: 'A standard troop Unit that you control (not a Champion / Lord / Mythical Beast).',
  },
  {
    id: 'lord',
    name: 'Lord',
    icon: '/images/icons/lord.png',
    description:
      'The Commander of your faction; a special Unit that is also defined as a Hero (not a Champion / Mythical Beast / Warrior). A Lord can explore the mist and be moved out of a player’s supply onto a coastal region or a region with a Settlement (as if deployed). Lords can also equip Artifacts and allows players to play a Battle Plan Card into battles in their region.',
  },
  {
    id: 'champion',
    name: 'Champion',
    icon: '/images/icons/champion.png',
    description:
      'One of the 3 numbered special Units that you control (not a Lord/Mythical Beast/Warrior). Champions can equip Artifacts and allows players to play a Battle Plan Card into battles in their region.',
  },
  {
    id: 'hero',
    name: 'Hero',
    icon: '/images/icons/hero.png',
    description:
      'Specifically a Lord or a Champion that you control (not a Warrior / Mythical Beast).',
  },
  {
    id: 'mythical-beast',
    name: 'Mythical Beast',
    icon: '/images/icons/mythical-beast.png',
    description:
      'A creature of Avalon which you control. These can be gained through bonding them.',
  },
  {
    id: 'enemy',
    name: 'Enemy',
    icon: '/images/icons/enemy.png',
    description:
      'Any standard icon surrounded by a spiky halo refers to a component controlled by any other player.',
  },
  {
    id: 'strength',
    name: 'Strength',
    icon: '/images/icons/strength.png',
    description:
      'Each icon represents 1 strength. Each basic Unit and Settlement adds 1 strength to their region.',
  },
  {
    id: 'plus-token',
    name: '+ Token',
    icon: '/images/icons/plus-token.png',
    prefix: '+',
    description:
      'A permanent Strength Token that gives +1 strength to whatever it is attached to. The supply of these Tokens is considered to be unlimited.',
  },
  {
    id: '1-initiative-card',
    name: '1 Initiative Card',
    icon: '/images/icons/1-initiative-card.png',
    description:
      'Any Main Deck Card with an initiative value of 1 (depicted in the top left corner of the Card). There are also 2 and 3 initiative versions of this icon.',
  },
  {
    id: 'move-card',
    name: 'Move Card',
    icon: '/images/icons/move-card.png',
    description:
      'A yellow-colored Card from the Move Deck that is guaranteed to have move icons on it.',
  },
  {
    id: 'deploy-card',
    name: 'Deploy Card',
    icon: '/images/icons/deploy-card.png',
    description:
      'A green-colored Card from the Deploy Deck that is guaranteed to have deploy icons on it.',
  },
  {
    id: 'settle-card',
    name: 'Settle Card',
    icon: '/images/icons/settle-card.png',
    description:
      'A blue-colored Card from the Settle Deck that is guaranteed to have a settle icon on it.',
  },
  {
    id: 'battle-plan-card',
    name: 'Battle Plan Card',
    icon: '/images/icons/battle-plan-card.png',
    description:
      'A red-colored Card from the Battle Plan Deck that is used, in combination with bonus Cards, to set the strength limit you can gain from Combat Cards during a battle and also provide other effects.',
  },
  {
    id: 'move-1-unit',
    name: 'Move 1 Unit',
    icon: '/images/icons/move-1-unit.png',
    description: 'Move a Unit from one region to an adjacent region.',
  },
  {
    id: 'move-an-army',
    name: 'Move An Army',
    icon: '/images/icons/move-an-army.png',
    description: 'Move as many Units as you choose from one region to an adjacent region.',
  },
  {
    id: 'move-in',
    name: 'Move In',
    icon: '/images/icons/move-in.png',
    description: 'Move as many Units as you choose from adjacent regions into a target region.',
  },
  {
    id: 'move-in-here',
    name: 'Move In Here',
    icon: '/images/icons/move-in-here.png',
    description:
      'Move as many Units as you choose from adjacent regions into the region where this reward was gained.',
  },
  {
    id: 'move-out',
    name: 'Move Out',
    icon: '/images/icons/move-out.png',
    description:
      'Move as many Units as you choose in one region to any amount of adjacent regions.',
  },
  {
    id: 'deploy',
    name: 'Deploy',
    icon: '/images/icons/deploy.png',
    description:
      'Deploy the number of Units depicted after the plus symbol from your supply to the same coastal or settled region.',
  },
  {
    id: 'deploy-2-warriors-here',
    name: 'Deploy 2 Warriors Here',
    icon: '/images/icons/deploy-2-warriors-here.png',
    description:
      'Deploy 2 Warriors into the region where this reward is gained. If gained through a Settlement, deploy to the settled region.',
  },
  {
    id: 'deploy-a-champion-here',
    name: 'Deploy A Champion Here',
    icon: '/images/icons/deploy-a-champion-here.png',
    description: 'Deploy a Champion to the region where this reward is gained.',
  },
  {
    id: 'settlement',
    name: 'Settlement',
    icon: '/images/icons/settlement.png',
    description:
      'Regions can be settled with Settlements that provide a new position to deploy from and give additional bonuses.',
  },
  {
    id: 'settle',
    name: 'Settle',
    icon: '/images/icons/settle.png',
    description: 'Place a Settlement into an explored region where you have strength.',
  },
  {
    id: 'favor',
    name: 'Favor',
    icon: '/images/icons/favor.png',
    description:
      'A reward that moves you up the Favor Track one spot, potentially giving you other rewards.',
  },
  {
    id: 'star',
    name: 'Star',
    icon: '/images/icons/star.png',
    description: 'A star depicts a chance to gain catch-up victory points via the Favor Track.',
  },
  {
    id: 'draw-a-card',
    name: 'Draw a Card',
    icon: '/images/icons/draw-a-card.png',
    description:
      'Draw a Card from the top of any of the Main Decks. If that Main Deck is empty, shuffle the Discard Pile and form a new Main Deck.',
  },
  {
    id: 'discard-a-card',
    name: 'Discard A Card',
    icon: '/images/icons/discard-a-card.png',
    description:
      'Discard 1 Card from your hand to the relevant discard pile. This is usually to pay for another Card that you are playing.',
  },
  {
    id: 'cost-reduction',
    name: 'Cost Reduction',
    icon: '/images/icons/cost-reduction.png',
    description:
      'Discard 1 less Card than you would do otherwise when paying the cost to play a Card from your hand.',
  },
  {
    id: 'faction-power',
    name: 'Faction Power',
    icon: '/images/icons/faction-power.png',
    description:
      'A resource that is tracked on a track on your Faction Board and can be spent to activate various abilities on your Faction Board and Artifacts.',
  },
  {
    id: 'artifact',
    name: 'Artifact',
    icon: '/images/icons/artifact.png',
    description:
      'A powerful item that can be equipped to a Lord or Champion. The Grail and Excalibur are also Artifacts.',
  },
  {
    id: 'excalibur',
    name: 'Excalibur',
    icon: '/images/icons/excalibur.png',
    description:
      'Gained by the first player to reach the end of the Favor Track or the player with the most favor at the start of the War Phase.',
  },
];
