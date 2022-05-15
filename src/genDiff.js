import _ from 'lodash';
import path from 'path';
import process from 'process';
import { readFileSync } from 'fs';
import parse from './parsers.js';
import stylish from './stylish.js';

const formAbsolutePath = (filepath) => {
  const cwd = process.cwd();
  return path.resolve(cwd, filepath);
};

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const format1 = path.extname(filepath1);
  const format2 = path.extname(filepath2);

  if ((format1 !== '.yaml' && format1 !== '.yml' && format1 !== '.json')
  || (format2 !== '.yaml' && format2 !== '.yml' && format2 !== '.json')) {
    return 'Wrong format of file!';
  }

  const file1obj = parse(readFileSync(formAbsolutePath(filepath1)), format1);
  const file2obj = parse(readFileSync(formAbsolutePath(filepath2)), format2);

  const iter = (obj1, obj2, resultArr) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const unitedKeys = _.union(keys1, keys2);
    const sortedKeys = _.sortBy(unitedKeys);

    const stylingData = sortedKeys.flatMap((key) => {
      let value = obj1[key];
      let status = 'unchanged';
      const objectComparison = obj1[key] === obj2[key];
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        status = 'has children';
        value = iter(obj1[key], obj2[key], resultArr);
      } else if (!_.has(obj1, key)) {
        value = obj2[key];
        status = 'added';
      } else if (!_.has(obj2, key)) {
        value = obj1[key];
        status = 'deleted';
      } else if (!objectComparison) {
        return resultArr.concat(
          { key, value: obj1[key], status: 'parent1' },
          { key, value: obj2[key], status: 'parent2' },
        );
      }

      return resultArr.concat({ key, value, status });
    });

    return stylingData;
  };
  if (outputFormat === 'stylish') {
    return stylish(iter(file1obj, file2obj, []));
  }
  return stylish(iter(file1obj, file2obj, []));
};

export default genDiff;
