import path from 'path';
import process from 'process';
import { readFileSync } from 'fs';

const getData = (filepath) => JSON.parse(readFileSync(path.resolve(process.cwd(), filepath), 'utf-8'));

export default getData;
