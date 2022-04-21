import _ from 'lodash';

const getDiffTree = (file1, file2) => {
  const keys = _.sortBy(Object.keys({ ...file1, ...file2 }));

  return keys.map((key) => {
    const value1 = file1[key];
    const value2 = file2[key];

    if (!_.has(file2, key)) {
      return {
        type: 'removed',
        key,
        value: value1,
      };
    }
    if (!_.has(file1, key)) {
      return {
        type: 'added',
        key,
        value: value2,
      };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        type: 'children',
        key,
        children: getDiffTree(value1, value2),
      };
    }

    if (!_.isEqual(value1, value2)) {
      return {
        type: 'changed',
        key,
        removedValue: value1,
        addedValue: value2,
      };
    }

    return {
      type: 'unchanged',
      key,
      value: value1,
    };
  });
};
export default getDiffTree;
