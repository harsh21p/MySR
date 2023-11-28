module.exports = {
  parserPreset: 'conventional-changelog-conventionalcommits',
  defaultIgnores: false,
  rules: {
    'body-empty': [2, 'never'],
    'scope-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'ci',
      ],
    ],
  },
};
