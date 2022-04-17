import path from 'path';
import process from 'process';
import yaml from 'js-yaml';
import { readFileSync } from 'fs';

const jsonParser = (filepath) =>
  JSON.parse(readFileSync(path.resolve(process.cwd(), filepath), 'utf-8'));
const yamlParser = (filepath) =>
  yaml.load(readFileSync(path.resolve(process.cwd(), filepath), 'utf-8'));

export { jsonParser, yamlParser };
