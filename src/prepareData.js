import _ from 'lodash';

const prepareData = (obj1, obj2, key) => {
  const objectComparison = obj1[key] === obj2[key];
  if (!_.has(obj1, key)) {
    return { key, value: obj2[key], status: 'added' };
  } if (!_.has(obj2, key)) {
    return { key, value: obj1[key], status: 'deleted' };
  } if (!objectComparison) {
    return [{
      key, value: obj1[key], newValue: obj2[key], status: 'changedAndParentIsObj1',
    }, {
      key, oldValue: obj1[key], value: obj2[key], status: 'changedAndParentIsObj2',
    }];
  }

  return { key, value: obj1[key], status: 'unchanged' };
};

export default prepareData;
