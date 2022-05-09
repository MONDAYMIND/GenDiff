import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiffPlaneYAML from '../src/genDiffPlaneYAML.js';

const __filename = fileURLToPath(import.meta.url);
const getFixturePath = (filename) => path.join(dirname(__filename), '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

let planeResult;

beforeAll(() => {
  planeResult = readFile('planeResult.txt');
});

test("genDiffPlane's main flow yaml", () => {
  const comparedYML = genDiffPlaneYAML(getFixturePath('file1plane.yml'), getFixturePath('file2plane.yml'));
  expect(comparedYML).toBe(planeResult);

  const comparedYMLwithYAML = genDiffPlaneYAML(getFixturePath('file1plane.yml'), getFixturePath('file2plane.yaml'));
  expect(comparedYMLwithYAML).toBe(planeResult);
});

test('wrong format in genDiffPlane yaml', () => {
  const comparedTXTWithYAML = genDiffPlaneYAML(getFixturePath('planeResult.txt'), getFixturePath('file2plane.yml'));
  expect(comparedTXTWithYAML).toBe('Wrong format of file!');
});
