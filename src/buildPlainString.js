import _ from 'lodash';

const buildPlainString = (obj, property) => {
  const isValueComplex = (_.isObject(obj.value)) ? '[complex value]' : obj.value;
  const preparedValue = (typeof obj.value === 'string') ? `'${obj.value}'` : isValueComplex;
  const isNewValueComplex = (_.isObject(obj.newValue)) ? '[complex value]' : obj.newValue;
  const preparedNewValue = (typeof obj.newValue === 'string') ? `'${obj.newValue}'` : isNewValueComplex;

  switch (obj.status) {
    case 'unchanged':
    case 'changedAndParentIsObj2':
      return '';
    case 'added':
      return `Property '${property}' was added with value: ${preparedValue}`;
    case 'deleted':
      return `Property '${property}' was removed`;
    case 'changedAndParentIsObj1':
      return `Property '${property}' was updated. From ${preparedValue} to ${preparedNewValue}`;
    default:
      return 'Wrong object status!';
  }
};

export default buildPlainString;
