import _ from 'lodash';
import path from 'path';
import process from 'process';
import { readFileSync } from 'fs';
import parse from './parsers.js';
import prepareData from './prepareData.js';
import format from './formatters/index.js';

const formAbsolutePath = (filepath) => {
  const cwd = process.cwd();
  return path.resolve(cwd, filepath);
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const format1 = path.extname(filepath1);
  const format2 = path.extname(filepath2);
  const supportedFormats = ['.yaml', '.yml', '.json'];
  if (!supportedFormats.includes(format1) || !supportedFormats.includes(format2)) {
    return 'Wrong format of file!';
  }
  const file1obj = parse(readFileSync(formAbsolutePath(filepath1)), format1);
  const file2obj = parse(readFileSync(formAbsolutePath(filepath2)), format2);

  const iter = (obj1, obj2, resultObj) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const sortedKeys = _.sortBy(_.union(keys1, keys2));

    const preparedData = sortedKeys.flatMap((key) => {
      if (!_.isObject(obj1[key]) || !_.isObject(obj2[key])) {
        return prepareData(obj1, obj2, key);
      }
      return { key, children: iter(obj1[key], obj2[key], resultObj), status: 'has children' };
    });
    return preparedData;
  };

  return format(iter(file1obj, file2obj, []), formatName);
};

export default genDiff;
