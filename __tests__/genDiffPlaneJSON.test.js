import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiffPlaneJSON from '../src/genDiffPlaneJSON.js';

const __filename = fileURLToPath(import.meta.url);
const getFixturePath = (filename) => path.join(dirname(__filename), '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

let planeResult;

beforeAll(() => {
  planeResult = readFile('planeResult.txt');
});

test("genDiffPlane's main flow json", () => {
  const comparedJSON = genDiffPlaneJSON(getFixturePath('file1plane.json'), getFixturePath('file2plane.json'));
  expect(comparedJSON).toBe(planeResult);
});

test('wrong format in genDiffPlane json', () => {
  const comparedTXTWithJSON = genDiffPlaneJSON(getFixturePath('planeResult.txt'), getFixturePath('file2plane.json'));
  expect(comparedTXTWithJSON).toBe('Wrong format of file!');
});
