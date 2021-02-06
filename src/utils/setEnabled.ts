import { promises } from 'fs';
import { join } from 'path';
import { response } from './response';

export function setEnabled(input: string, enabled: boolean): Promise<void> {
  const responses: response[] = require('../../data/responses.json');
  const res = responses.find((res) => res.input === input);
  let filePath = join('data', 'responses.json');
  if (process.platform === 'linux') filePath = join(filePath, '..', '..');
  if (res) res.enabled = enabled;
  return promises.writeFile(
    filePath,
    JSON.stringify(responses, null, 2) // Spacing of two
  );
}
