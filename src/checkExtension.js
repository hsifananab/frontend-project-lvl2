const checkExtension = (filepath) => (filepath.split('.').pop() === 'json'
  ? filepath
  : `ERR: The format of the ${filepath} is invalid`);

export default checkExtension;
