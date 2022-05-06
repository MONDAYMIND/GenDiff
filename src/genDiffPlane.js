import _ from 'lodash';
import path from 'path';
import process from 'process';
import { readFileSync } from 'fs';

const formAbsolutePath = (filepath) => {
  const cwd = process.cwd();
  return path.resolve(cwd, filepath);
};

const genDiffPlane = (filepath1, filepath2) => {
  if (!filepath1.endsWith('json') || !filepath2.endsWith('json')) {
    return 'Wrong format of file!';
  }
  const data1 = readFileSync(formAbsolutePath(filepath1), 'utf8');
  const data1obj = JSON.parse(data1);
  const data2 = readFileSync(formAbsolutePath(filepath2), 'utf8');
  const data2obj = JSON.parse(data2);

  const entries1 = Object.entries(data1obj);
  const entries2 = Object.entries(data2obj);
  const entries = _.unionWith(entries1, entries2, _.isEqual);
  const sortedEntries = _.sortBy(entries, ([a]) => a[0]);

  const lines = sortedEntries.map(([key, value]) => {
    const keyValueString = `${key}: ${value}`;
    if (!Object.hasOwn(data1obj, key)
    || (data1obj[key] !== data2obj[key] && value === data2obj[key])) {
      return `  + ${keyValueString}`;
    } if (!Object.hasOwn(data2obj, key)
    || (data1obj[key] !== data2obj[key] && value === data1obj[key])) {
      return `  - ${keyValueString}`;
    }
    return `    ${keyValueString}`;
  });

  return [
    '{',
    ...lines,
    '}'].join('\n');
};

export default genDiffPlane;
