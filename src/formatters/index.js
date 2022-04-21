import stylish from './stylish.js';
import plain from './plain.js';

const formatData = (data, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    default:
      throw new Error('Wrong format');
  }
};

export default formatData;
