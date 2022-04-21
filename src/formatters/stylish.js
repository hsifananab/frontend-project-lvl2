import _ from 'lodash';

const indent = (depth, spaceCount = 4) => ' '.repeat(spaceCount * depth - 2);

const stringify = (data, treeDepth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  if (data === null) {
    return null;
  }
  const lines = Object.entries(data).map(
    ([key, value]) =>
      `${indent(treeDepth + 1)}  ${key}: ${stringify(value, treeDepth + 1)}`,
  );
  return ['{', ...lines, `${indent(treeDepth)}  }`].join('\n');
};

const stylish = (data) => {
  const iter = (tree, depth) =>
    tree.map((node) => {
      const getValue = (value, sign) =>
        `${indent(depth)}${sign} ${node.key}: ${stringify(value, depth)}\n`;
      switch (node.type) {
        case 'removed':
          return getValue(node.value, '-');
        case 'added':
          return getValue(node.value, '+');
        case 'unchanged':
          return getValue(node.value, ' ');
        case 'updated':
          return `${getValue(node.removedValue, '-')}${getValue(
            node.addedValue,
            '+',
          )}`;
        case 'children':
          return `${indent(depth)}  ${node.key}: {\n${iter(
            node.children,
            depth + 1,
          ).join('')}${indent(depth)}  }\n`;
        default:
          throw new Error(`${node.type} does not exist`);
      }
    });
  return `{\n${iter(data, 1).join('')}}`;
};

export default stylish;
