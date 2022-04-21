import path from 'path';
import process from 'process';
import yaml from 'js-yaml';
import { readFileSync } from 'fs';

const jsonParser = (filepath) => JSON.parse(readFileSync(path.resolve(process.cwd(), filepath), 'utf-8'));
const yamlParser = (filepath) => yaml.load(readFileSync(path.resolve(process.cwd(), filepath), 'utf-8'));

const readFile = (filepath) => {
  const extname = path.extname(filepath);
  if (extname === '.json') {
    return jsonParser(filepath);
  }
  if (extname === '.yaml' || extname === '.yml') {
    return yamlParser(filepath);
  }
  throw new Error('The format of the file is invalid!');
};

export default readFile;
