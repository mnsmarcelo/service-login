module.exports = {
  extends: ['airbnb-typescript/base'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'import/prefer-default-export': 'off',
    '@typescript-eslint/naming-convention': 'off',
    'class-methods-use-this': 'off',
    'max-len': ['error', 120, { ignoreTemplateLiterals: true }],
    'max-classes-per-file': 'off',
    'linebreak-style': 'off',
    'import/export': 'off'
  },
};
