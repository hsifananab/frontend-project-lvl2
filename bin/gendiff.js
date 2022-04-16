#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../index.js';
// import _has from 'lodash/has.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-v, --vers', 'output the current version')
  .option('-f, --format', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((file1, file2) => console.log(genDiff(file1, file2)));

program.parse();
