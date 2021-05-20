import { User } from 'discord.js';

export interface tally {
  readonly user: User;
  count: number;
}