import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiffPlane from '../src/genDiffPlane.js';

const __filename = fileURLToPath(import.meta.url);
const getFixturePath = (filename) => path.join(dirname(__filename), '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

let comparedJSON;
let planeResult;
let comparedTXTWithJSON;

beforeAll(() => {
  comparedJSON = genDiffPlane(getFixturePath('file1.json'), getFixturePath('file2.json'));
  comparedTXTWithJSON = genDiffPlane(getFixturePath('planeResult.txt'), getFixturePath('file2.json'));
  planeResult = readFile('planeResult.txt');
});

test("genDiffPlane's main flow", () => {
  expect(comparedJSON).toBe(planeResult);
});

test('wrong format in genDiffPlane', () => {
  expect(comparedTXTWithJSON).toBe('Wrong format of file!');
});
