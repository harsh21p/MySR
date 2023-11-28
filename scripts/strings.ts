import {camelCase} from 'lodash';

export const toCamel = (str: string) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) {
      return '';
    } // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
};

export const toCamelCase = (words: string[]): string => {
  const wordsCamel = words.map((word: string, idx: number): string =>
    idx === 0 ? word.toLowerCase() : camelCase(word),
  );
  return wordsCamel.join('');
};

export const toCamelCaseFromDashCase = (str: string): string =>
  str ? toCamelCase(str.split('-')) : str;
