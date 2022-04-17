import has from 'lodash/has.js';
import sortBy from 'lodash/sortBy.js';
import path from 'path';
import { jsonParser, yamlParser } from './src/parsers.js';

const getFormat = (filepath) => {
  const extname = path.extname(filepath);
  if (extname === '.json') {
    return jsonParser(filepath);
  }
  if (extname === '.yaml' || extname === '.yml') {
    return yamlParser(filepath);
  }
  return console.log('ERR: The format of the file is invalid');
};

const genDiff = (filepath1, filepath2) => {
  const file1 = getFormat(filepath1);
  const file2 = getFormat(filepath2);

  const keys = sortBy(Object.keys({ ...file1, ...file2 }));
  const signs = ['-', '+', ' '];

  const result = keys
    .map((key) => {
      if (!has(file2, key)) {
        return `${signs[0]} ${key}: ${file1[key]}`;
      }
      if (!has(file1, key)) {
        return `${signs[1]} ${key}: ${file2[key]}`;
      }
      if (file1[key] !== file2[key]) {
        return `${signs[0]} ${key}: ${file1[key]}\n  ${signs[1]} ${key}: ${file2[key]}`;
      }
      return `${signs[2]} ${key}: ${file1[key]}`;
    })
    .join('\n  ');

  return `{\n  ${result}\n}`;
};

export default genDiff;
