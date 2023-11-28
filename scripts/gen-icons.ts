import fs from 'fs';
import path from 'path';
import process from 'process';

//import {toCamelCaseFromDashCase} from './strings';
import camelCase from 'camelcase';

const srcDir = process.argv[2];
const dstFile = process.argv[3];

if (!srcDir) {
  console.error('Missing arguments: <srcDir> <dstFile>');
  process.exit(1);
}
if (!dstFile) {
  console.error('Missing argument: <dstFile>');
  process.exit(1);
}

//const fileEncodingOptions = {encoding: 'utf8'};

//const undash = toCamelCaseFromDashCase;

const svgCleanup = (svg: string): string =>
  svg
    .replace(/^<\?xml((?!\?>)[\s\S])*\?>\s*/, '') // no XML header
    .replace(/\s*<!--((?!-->)[\s\S])*-->\s*/g, '') // no XML comments
    .replace(/xmlns(|:[^=]+)="[^"]+"/g, '') // no xmlns
    .replace(
      // remove version from svg tag
      /<svg((?!version="[^"]+")[^>]+)(version="[^"]+"\s*)((?!version="[^"]+")[^>]*)>/g,
      '<svg$1$3>',
    )
    // BEGIN: useless svg tags:
    .replace(/\s*<title[^>]*>((?!<\/title>)[\s\S])*<\/title>\s*/g, '')
    .replace(/\s*<desc[^>]*>((?!<\/desc>)[\s\S])*<\/desc>\s*/g, '')
    .replace(/<defs>\s*<\/defs>/g, '') // no empty <defs></defs>
    // END: useless tags
    .replace(/\n/g, ' ') // multi-line to space
    .replace(/\s+/g, ' ') // use single space
    .replace(/>\s+</g, '><') // no space between tags 'a> <b>' -> 'a><b'
    .replace(/"\s+>/g, '">') // no space between " and >
    .replace(/"\s+\/>/g, '"/>') // no space between " and />
    .trim();

interface RecursiveStringMap {
  [name: string]: string | RecursiveStringMap;
}

const scan = (dir: string): RecursiveStringMap => {
  const ret: RecursiveStringMap = {};
  const names = fs.readdirSync(dir, 'utf-8');
  for (let i = 0; i < names.length; i += 1) {
    const name = names[i];
    if (typeof name === 'string') {
      const p = path.join(dir, name);
      const st = fs.statSync(p);
      if (st.isDirectory()) {
        ret[name] = scan(p);
      } else if (st.isFile()) {
        const {name: justName, ext} = path.parse(name);
        if (ext === '.svg') {
          ret[justName] = svgCleanup(fs.readFileSync(p, 'utf-8'));
        }
      }
    }
  }
  return ret;
};

const space = '  ';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stringify = (obj: any, level: number): string => {
  const prefix = space.repeat(level);
  if (typeof obj === 'string') {
    return `\n${prefix}${space}'${obj}'`;
  }
  const childLevel = level + 1;
  const childPrefix = space.repeat(childLevel);
  const children = Object.entries(obj)
    .sort()
    .map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ([key, value]: [string, any]): string =>
        `${childPrefix}${camelCase(key)}:${stringify(value, childLevel)},\n`,
    );
  children.splice(0, 0, ' {\n');
  children.push(`${prefix}}`);
  return children.join('');
};

const icons = scan(srcDir);
const contents = `// this file is auto-generated. Use 'yarn update-icons'

const icons =${stringify(icons, 0)};

export default icons;
`;
fs.writeFileSync(dstFile, contents, 'utf-8');
