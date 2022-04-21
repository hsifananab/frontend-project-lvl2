import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const json1 = getFixturePath('file1.json');
const json2 = getFixturePath('file2.json');

const yaml1 = getFixturePath('file1.yaml');
const yaml2 = getFixturePath('file2.yaml');
const yml1 = getFixturePath('file1.yml');
const yml2 = getFixturePath('file2.yml');

const stylish = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const plain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

const json = '[{"type":"children","key":"common","children":[{"type":"added","key":"follow","value":false},{"type":"unchanged","key":"setting1","value":"Value 1"},{"type":"removed","key":"setting2","value":200},{"type":"updated","key":"setting3","removedValue":true,"addedValue":null},{"type":"added","key":"setting4","value":"blah blah"},{"type":"added","key":"setting5","value":{"key5":"value5"}},{"type":"children","key":"setting6","children":[{"type":"children","key":"doge","children":[{"type":"updated","key":"wow","removedValue":"","addedValue":"so much"}]},{"type":"unchanged","key":"key","value":"value"},{"type":"added","key":"ops","value":"vops"}]}]},{"type":"children","key":"group1","children":[{"type":"updated","key":"baz","removedValue":"bas","addedValue":"bars"},{"type":"unchanged","key":"foo","value":"bar"},{"type":"updated","key":"nest","removedValue":{"key":"value"},"addedValue":"str"}]},{"type":"removed","key":"group2","value":{"abc":12345,"deep":{"id":45}}},{"type":"added","key":"group3","value":{"deep":{"id":{"number":45}},"fee":100500}}]';

test('gendiff', () => {
  expect(genDiff(yaml1, yaml2)).toEqual(stylish);
  expect(genDiff(yml1, yml2)).toEqual(stylish);

  expect(genDiff(json1, json2, 'stylish')).toEqual(stylish);
  expect(genDiff(json1, json2, 'plain')).toEqual(plain);
  expect(genDiff(json1, json2, 'json')).toEqual(json);
});
