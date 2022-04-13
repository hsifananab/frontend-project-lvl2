#!/usr/bin/env node
import { program } from 'commander';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-v, --vers', 'output the current version')
  .option('-f, --format', 'output format')
  .arguments('<filepath1> <filepath2>');

program.parse();
