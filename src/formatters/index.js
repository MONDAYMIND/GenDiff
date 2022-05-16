import stylish from './stylish.js';
import plain from './plain.js';

const chooseFormatter = (data, formatName) => {
  let formatterFunction;
  if (formatName === 'stylish') {
    formatterFunction = stylish;
  } else if (formatName === 'plain') {
    formatterFunction = plain;
  }

  return formatterFunction(data);
};

export default chooseFormatter;
