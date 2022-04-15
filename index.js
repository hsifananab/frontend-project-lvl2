import getData from './src/getData.js';
import has from 'lodash/has.js';
import sortBy from 'lodash/sortBy.js';

const genDiff = (filepath1, filepath2) => {
  const isJSON = (filepath) => filepath.split('.').pop() === 'json';

  if (!isJSON(filepath1) || !isJSON(filepath2)) {
    return console.log(`ERR: The format of the file is invalid`);
  }

  const file1 = getData(filepath1);
  const file2 = getData(filepath2);

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

  console.log(`{\n  ${result}\n}`);
};

export default genDiff;
