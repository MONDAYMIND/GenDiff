import _ from 'lodash';
import path from 'path';
import process from 'process';
import { readFileSync } from 'fs';
import parse from './parsers.js';

const formAbsolutePath = (filepath) => {
  const cwd = process.cwd();
  return path.resolve(cwd, filepath);
};

const genDiffPlaneYAML = (filepath1, filepath2) => {
  const format1 = path.extname(filepath1);
  const format2 = path.extname(filepath2);

  if ((format1 !== '.yaml' && format1 !== '.yml' && format1 !== '.json')
  || (format2 !== '.yaml' && format2 !== '.yml' && format2 !== '.json')) {
    return 'Wrong format of file!';
  }

  const file1obj = parse(readFileSync(formAbsolutePath(filepath1)), format1);
  const file2obj = parse(readFileSync(formAbsolutePath(filepath2)), format2);

  const entries1 = Object.entries(file1obj);
  const entries2 = Object.entries(file2obj);
  const entries = _.unionWith(entries1, entries2, _.isEqual);
  const sortedEntries = _.sortBy(entries, ([a]) => a[0]);

  const lines = sortedEntries.map(([key, value]) => {
    let operator = ' ';
    const objectComparison = file1obj[key] === file2obj[key];
    if (!_.has(file1obj, key)
    || (!objectComparison && value === file2obj[key])) {
      operator = '+';
    } if (!_.has(file2obj, key)
    || (!objectComparison && value === file1obj[key])) {
      operator = '-';
    }
    return `  ${operator} ${key}: ${value}`;
  });

  return [
    '{',
    ...lines,
    '}'].join('\n');
};

export default genDiffPlaneYAML;
