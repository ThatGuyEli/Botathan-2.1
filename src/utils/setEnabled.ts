import { promises } from 'fs';
import { join } from 'path';
import { response } from './response';

export function setEnabled(input: string, enabled: boolean): Promise<void> {
  const responses: response[] = require('../../data/responses.json');
  const res = responses.find((res) => res.input === input);
  if (res) res.enabled = enabled;
  return promises.writeFile(
    join('data', 'responses.json'),
    JSON.stringify(responses, null, 2) // Spacing of two
  );
}
