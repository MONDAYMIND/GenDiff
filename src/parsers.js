import yaml from 'js-yaml';

const parse = (data, format) => {
  let parsingFunction;
  if (format === '.json') {
    parsingFunction = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parsingFunction = yaml.load;
  }

  return parsingFunction(data);
};

export default parse;
