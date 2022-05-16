import _ from 'lodash';

const plain = (difference) => {
  const iter = (diff, property) => {
    const result = diff.map((obj) => {
      let newProperty = `${property}.${obj.key}`;
      if (property === '') {
        newProperty = `${obj.key}`;
      }
      let val = obj.value;
      if (_.isObject(obj.value) && !Array.isArray(obj.value)) {
        val = '[complex value]';
      } if (typeof obj.value === 'string') {
        val = `'${obj.value}'`;
      }
      let { changedValue } = obj;
      if (typeof obj.changedValue === 'string') {
        changedValue = `'${obj.changedValue}'`;
      }

      switch (obj.status) {
        case 'unchanged':
        case 'changedAndParentIsObj2':
          return '';
        case 'added':
          return `Property '${newProperty}' was added with value: ${val}`;
        case 'deleted':
          return `Property '${newProperty}' was removed`;
        case 'changedAndParentIsObj1':
          return `Property '${newProperty}' was updated. From ${val} to ${changedValue}`;
        default:
          return `${iter(obj.value, newProperty)}`;
      }
    });
    const filteredLines = result.filter((line) => line !== '');
    return [...filteredLines].join('\n');
  };

  return iter(difference, '');
};

export default plain;
