import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const getFixturePath = (filename) => path.join(dirname(__filename), '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

let resultStylish;
let resultPlain;

beforeAll(() => {
  resultStylish = readFile('result.txt');
  resultPlain = readFile('resultPlain.txt');
});

test("genDiff's main flow json stylish", () => {
  const comparedJSON = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(comparedJSON).toEqual(resultStylish);
});

test("genDiff's main flow yaml stylish", () => {
  const comparedYML = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(comparedYML).toEqual(resultStylish);

  const comparedYMLwithYAML = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'));
  expect(comparedYMLwithYAML).toEqual(resultStylish);
});

test("genDiff's main flow json with yaml stylish", () => {
  const comparedJSONwithYAML = genDiff(getFixturePath('file1.json'), getFixturePath('file2.yaml'));
  expect(comparedJSONwithYAML).toEqual(resultStylish);
});

test("genDiff's main flow json with yaml plain", () => {
  const comparedJSON = genDiff(getFixturePath('file1.json'), getFixturePath('file2.yaml'), 'plain');
  expect(comparedJSON).toEqual(resultPlain);
});

test('wrong format in genDiff json', () => {
  const comparedTXTWithJSON = genDiff(getFixturePath('resultStylish.txt'), getFixturePath('file2.json'));
  expect(comparedTXTWithJSON).toBe('Wrong format of file!');
});

test('wrong format in genDiff yaml', () => {
  const comparedTXTWithYAML = genDiff(getFixturePath('resultStylish.txt'), getFixturePath('file2.yml'));
  expect(comparedTXTWithYAML).toBe('Wrong format of file!');
});
