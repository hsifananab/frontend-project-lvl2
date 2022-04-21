import stylish from './stylish.js';
import plain from './plain.js';
import toJson from './toJSON.js';

const formatData = (data, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return toJson(data);
    default:
      throw new Error('Wrong format');
  }
};

export default formatData;
