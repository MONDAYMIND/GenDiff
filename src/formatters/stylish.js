import _ from 'lodash';
import selectOperator from '../selectOperator.js';

const stylish = (difference) => {
  const iter = (diff, depth) => {
    if (!_.isObject(diff)) {
      return `${diff}`;
    }
    const replacer = '    ';
    const currentIndent = `${replacer.repeat(depth)}`;
    const bracketIndent = `${replacer.repeat(depth - 1)}`;

    if (!Array.isArray(diff)) {
      const resultIfNotArray = Object
        .keys(diff)
        .flatMap((key) => [`${currentIndent}${key}: ${iter(diff[key], depth + 1)}`]);
      return ['{', ...resultIfNotArray, `${bracketIndent}}`].join('\n');
    }
    const resultIfArray = diff.flatMap((obj) => {
      if (obj.status !== 'has children') {
        const operator = selectOperator(obj);
        return [`${bracketIndent}  ${operator} ${obj.key}: ${iter(obj.value, depth + 1)}`];
      }
      return [`${currentIndent}${obj.key}: ${iter(obj.children, depth + 1)}`];
    });
    return ['{', ...resultIfArray, `${bracketIndent}}`].join('\n');
  };

  return iter(difference, 1);
};

export default stylish;
