import readFile from './src/parsers.js';
import getDiffTree from './src/getDiffTree.js';
import stylish from './src/formatters/stylish.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);

  const data = getDiffTree(file1, file2);
  const stylishData = stylish(data);
  return stylishData;
};

export default genDiff;
