import { Collection, Message } from 'discord.js';
import { tally } from './tally';

export function tallyPins(pins: Collection<string, Message>): Array<tally> {
  const tallies: Array<tally> = [];
  pins.forEach((message) => {
    const t = tallies.find((t) => t.user.id === message.author.id);
    if (t === undefined) {
      // create a new tally and add it
      tallies.push({
        user: message.author,
        count: 1,
      });
    }
    else {
      t.count++;
    }
  });
  return tallies;
}
