import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const format = (data, formatName) => {
  if (formatName === 'plain') {
    return plain(data);
  } if (formatName === 'json') {
    return json(data);
  }
  return stylish(data);
};

export default format;
