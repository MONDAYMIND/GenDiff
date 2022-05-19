import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const getFixturePath = (filename) => path.join(dirname(__filename), '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const cases = [
  ['file1.json', 'file2.yml', 'stylish', 'resultStylish.txt'],
  ['file1.json', 'file2.yaml', 'plain', 'resultPlain.txt'],
  ['file1.json', 'file2.yaml', 'json', 'resultJSON.txt'],
];

test.each(cases)('compare "%s" and "%s" with %s formatter', (file1, file2, formatName, fixture) => {
  const expected = readFile(fixture);
  const actual = genDiff(getFixturePath(file1), getFixturePath(file2), formatName);
  expect(actual).toEqual(expected);
});

test('default stylish formatting', () => {
  const expected = readFile('resultStylish.txt');
  const compareWithDefaultFormetter = genDiff(getFixturePath('file1.json'), getFixturePath('file2.yaml'));
  expect(compareWithDefaultFormetter).toEqual(expected);
});

test('unsupported file format in genDiff', () => {
  const compareUnsupportedFormats = genDiff(getFixturePath('resultStylish.txt'), getFixturePath('file2.json'));
  expect(compareUnsupportedFormats).toBe('Unsupported format of file!');
});

test('unsupported formatter in genDiff', () => {
  const compareWithUnsupportedFormatter = genDiff(getFixturePath('file1.json'), getFixturePath('file2.yaml'), 'unsupported');
  expect(compareWithUnsupportedFormatter).toBe('Unsupported formatter selected!');
});
