import _ from 'lodash';
import path from 'path';
import process from 'process';
import { readFileSync } from 'fs';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import format from './formatters/index.js';

const formAbsolutePath = (filepath) => {
  const cwd = process.cwd();
  return path.resolve(cwd, filepath);
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const format1 = path.extname(filepath1);
  const format2 = path.extname(filepath2);
  const file1obj = parse(readFileSync(formAbsolutePath(filepath1)), format1);
  const file2obj = parse(readFileSync(formAbsolutePath(filepath2)), format2);
  if (!_.isObject(file1obj) || !_.isObject(file2obj)) {
    return 'Unsupported format of file!';
  }

  const preparedTree = buildTree(file1obj, file2obj, []);

  return format(preparedTree, formatName);
};

export default genDiff;
