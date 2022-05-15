import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const getFixturePath = (filename) => path.join(dirname(__filename), '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

let result;

beforeAll(() => {
  result = readFile('result.txt');
});

test("genDiff's main flow json", () => {
  const comparedJSON = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(comparedJSON).toEqual(result);
});

test("genDiff's main flow yaml", () => {
  const comparedYML = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(comparedYML).toEqual(result);

  const comparedYMLwithYAML = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'));
  expect(comparedYMLwithYAML).toEqual(result);
});

test("genDiff's main flow json with yaml", () => {
  const comparedJSONwithYAML = genDiff(getFixturePath('file1.json'), getFixturePath('file2.yaml'));
  expect(comparedJSONwithYAML).toEqual(result);
});

test('wrong format in genDiff json', () => {
  const comparedTXTWithJSON = genDiff(getFixturePath('result.txt'), getFixturePath('file2.json'));
  expect(comparedTXTWithJSON).toBe('Wrong format of file!');
});

test('wrong format in genDiff yaml', () => {
  const comparedTXTWithYAML = genDiff(getFixturePath('result.txt'), getFixturePath('file2.yml'));
  expect(comparedTXTWithYAML).toBe('Wrong format of file!');
});
