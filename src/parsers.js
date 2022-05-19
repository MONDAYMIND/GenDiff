import yaml from 'js-yaml';

const parse = (data, format) => {
  switch (format) {
    case ('.yml'):
    case ('.yaml'):
      return yaml.load(data);
    case ('.json'):
      return JSON.parse(data);
    default:
      return 'Unsupported format of file!';
  }
};

export default parse;
