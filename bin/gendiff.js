#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/genDiff.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .argument('[format]', 'output format, if required', 'stylish')
  .action((filepath1, filepath2, outputFormat) => {
    const diff = genDiff(filepath1, filepath2, outputFormat);
    console.log(diff);
  });

export default program.parse();
