import _ from 'lodash';

const stylish = (difference) => {
  const iter = (diff, depth) => {
    if (!_.isObject(diff)) {
      return `${diff}`;
    }
    let replacer = '    ';
    if (depth === 0) {
      replacer = '';
    }
    const indentOfNoncomparableObject = `${replacer.repeat(depth + 1)}`;
    const bracketIndent = `${replacer.repeat(depth)}`;

    let result;
    if (!Array.isArray(diff)) {
      result = Object
        .keys(diff)
        .map((key) => `${indentOfNoncomparableObject}${key}: ${iter(diff[key], depth + 1)}`);
    } else {
      result = diff.map((obj) => {
        let operator = ' ';
        if (obj.status === 'added' || obj.status === 'changedAndParentIsObj2') {
          operator = '+';
        } if (obj.status === 'deleted' || obj.status === 'changedAndParentIsObj1') {
          operator = '-';
        }
        const indentOfComparableObject = `${replacer.repeat(depth)}  ${operator} `;
        return `${indentOfComparableObject}${obj.key}: ${iter(obj.value, depth + 1)}`;
      });
    }

    return [
      '{',
      ...result,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(difference, 0);
};

export default stylish;
