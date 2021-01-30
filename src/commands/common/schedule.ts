import { Client, Command, CommandoMessage } from 'discord.js-commando';

interface indexable<T> {
  readonly [index: string]: T
}

function pad(str: string, size: number): string {
  while (str.length < size) {
    str += ' ';
  }
  return str;
} 

function formatSchedule(data: indexable<string>): string {
  let schedule = '```';
  Object.getOwnPropertyNames(data).forEach((name) => {
    schedule += `${pad(name.toUpperCase(), 5)} ${data[name]} \n`;
  });
  schedule += '```';
  return schedule;
}

const schedules: indexable<indexable<string>> = {
  normal: {
    clc: '7:45 - 8:00',
    pd1: '8:04 - 9:19',
    pd2: '9:23 - 10:38',
    pd3: '10:42 - 12:38',
    a: '10:38 - 11:08',
    b: '11:08 - 11:38',
    c: '11:38 - 12:08',
    d: '12:08 - 12:38',
    pd4: '12:42 - 1:57',
    flex: '2:01 - 2:46',
  },
  half: {
    pd1: '7:45 - 8:41',
    pd2: '8:45 - 9:36',
    pd3: '9:40 - 10:31',
    pd4: '10:35 - 11:30',
  },
  two: {
    pd1: '9:45 - 10:41',
    pd2: '10:45 - 11:41',
    pd3: '11:45 - 1:41',
    a: '11:41 - 12:11',
    b: '12:11 - 12:41',
    c: '12:41 - 1:11',
    d: '1:11 - 1:41',
    pd4: '1:45 - 2:46',
  },
  assembly: {
    pd1: '7:45 - 8:55 / 8:55 - 10:05',
    pd2: '10:09 - 11:24',
    pd3: '11:28 - 1:24',
    a: '11:24 - 11:54',
    b: '11:54 - 12:24',
    c: '12:24 - 12:54',
    d: '12:54 - 1:24',
    pd4: '1:28 - 2:46',
  },
  finals: {
    'pd1/pd2': '7:45 - 9:35',
    'pd3/pd4': '9:40 - 11:30',
  },
};

module.exports = class ScheduleCommand extends (
  Command
) {
  constructor(client: Client) {
    super(client, {
      name: 'schedule',
      aliases: ['schedules'],
      group: 'common',
      memberName: 'schedule',
      description: 'Returns the requested school schedule.',
      args: [
        {
          key: 'day',
          prompt: 'What kind of school day is it?',
          type: 'string',
          validate: (text: string) => schedules.hasOwnProperty(text)
        },
      ],
    });
  }

  run(message: CommandoMessage, { day }: { day: string }) {
    if (schedules.hasOwnProperty(day)) return message.say(formatSchedule(schedules[day]));
    return message.say('Invalid schedule.');
  }
};
