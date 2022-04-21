import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value) && value !== null) {
    return '[complex value]';
  }
  if (_.isString(value)) return `'${value}'`;
  return String(value);
};

const plain = (data) => {
  const format = (tree, parent) => tree
      .filter((node) => node.type !== 'unchanged')
      .map((node) => {
        const property = parent ? `${parent}.${node.key}` : `${node.key}`;
        switch (node.type) {
          case 'removed':
            return `Property '${property}' was ${node.type}`;
          case 'added':
            return `Property '${property}' was ${
              node.type
            } with value: ${stringify(node.value)}`;
          case 'updated':
            return `Property '${property}' was updated. From ${stringify(
              node.removedValue,
            )} to ${stringify(node.addedValue)}`;
          case 'children':
            return `${format(node.children, property)}`;
          default:
            throw new Error(`${node.type} does not exist`);
        }
      })
      .join('\n');
  return format(data, 0);
};

export default plain;
