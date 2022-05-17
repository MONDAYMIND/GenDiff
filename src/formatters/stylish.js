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

    const resultIfIsNotArray = [];
    const resultIfIsArray = [];
    if (!Array.isArray(diff)) {
      Object
        .keys(diff)
        .map((key) => resultIfIsNotArray.push(`${currentIndent}${key}: ${iter(diff[key], depth + 1)}`));
    } else {
      diff.map((obj) => {
        if (obj.status !== 'has children') {
          const operator = selectOperator(obj);
          return resultIfIsArray.push(`${bracketIndent}  ${operator} ${obj.key}: ${iter(obj.value, depth + 1)}`);
        }
        return resultIfIsArray.push(`${currentIndent}${obj.key}: ${iter(obj.children, depth + 1)}`);
      });
    }

    return [
      '{',
      ...resultIfIsNotArray,
      ...resultIfIsArray,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(difference, 1);
};

export default stylish;
