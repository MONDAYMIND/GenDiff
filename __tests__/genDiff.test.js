import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const getFixturePath = (filename) => path.join(dirname(__filename), '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const cases = [
  ['file1.json', 'file2.yml', 'stylish', 'resultStylish.txt'],
  ['file1.json', 'file2.yaml', 'stylish', 'resultStylish.txt'],
  ['file1.json', 'file2.yaml', 'plain', 'resultPlain.txt'],
  ['file1.json', 'file2.yaml', 'json', 'resultJSON.json'],
];

test.each(cases)('compare "%s" and "%s" with %s formatter', (file1, file2, formatName, fixture) => {
  const expected = readFile(fixture);
  const actual = genDiff(getFixturePath(file1), getFixturePath(file2), formatName);
  expect(actual).toEqual(expected);
});

test.each([
  ['resultStylish.txt', 'file2.json'],
  ['file1.yaml', 'result.txt'],
])('wrong file format in genDiff', (file1, file2) => {
  const compareWrongFormat = genDiff(getFixturePath(file1), getFixturePath(file2));
  expect(compareWrongFormat).toBe('Wrong format of file!');
});
