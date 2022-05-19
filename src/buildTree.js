import _ from 'lodash';
import prepareData from './prepareData.js';

const buildTree = (obj1, obj2, resultObj) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  const preparedData = sortedKeys.flatMap((key) => {
    if (!_.isObject(obj1[key]) || !_.isObject(obj2[key])) {
      return prepareData(obj1, obj2, key);
    }
    return { key, children: buildTree(obj1[key], obj2[key], resultObj), status: 'has children' };
  });
  return preparedData;
};

export default buildTree;
