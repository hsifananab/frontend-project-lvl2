import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);

const json1 = getPath('file1.json');
const json2 = getPath('file2.json');

const yaml1 = getPath('file1.yaml');
const yaml2 = getPath('file2.yaml');

const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('gendiff', () => {
  expect(genDiff(json1, json2)).toEqual(result);
  expect(genDiff(yaml1, yaml2)).toEqual(result);
});
