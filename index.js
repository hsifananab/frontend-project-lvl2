import readFile from './src/parsers.js';
import getDiffTree from './src/getDiffTree.js';
import formatData from './src/formatters/index.js';
import stylish from './src/formatters/stylish.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);

  const data = getDiffTree(file1, file2);
  console.log(stylish(data));
  const formattedData = formatData(data, formatName);
  return formattedData;
};

export default genDiff;
