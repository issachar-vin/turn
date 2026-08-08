import type { Game } from './types';
import { avalon } from './avalon';

export const games: Game[] = [avalon];

export function getGame(slug: string): Game | undefined {
  return games.find((game) => game.slug === slug);
}
