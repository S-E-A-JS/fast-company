module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [ 'plugin:react/recommended', 'standard' ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [ 'react' ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    quotes: [
      'error', 'single', {
        allowTemplateLiterals: true,
      },
    ],
    semi: [ 2, 'never' ],
    'arrow-parens': [ 'error', 'as-needed' ],
    'space-before-function-paren': 0,
    'multiline-ternary': 0,
    'no-unused-vars': 1,
    'no-tabs': 0,
    indent: [ 'error', 2 ],
    'array-bracket-spacing': [
      'error',
      'always',
      {
        objectsInArrays: false,
      },
    ],
    'array-bracket-newline': [
      'error',
      {
        multiline: true,
        minItems: 3,
      },
    ],
    'no-dupe-keys': 0,
    'multiline-ternary': [ 'error', 'always' ],
    'comma-dangle': [ 'warn', 'always-multiline' ],
    'eol-last': [ 'error', 'never' ],
    'func-call-spacing': [ 'error', 'always' ],
    'block-spacing': 'error',
    'space-before-function-paren': [
      'error', {
        anonymous: 'always',
        named: 'always',
        asyncArrow: 'always',
      },
    ],
    'space-unary-ops': 'error',
    'space-in-parens': [ 'error', 'always' ],
    'arrow-body-style': [ 'error', 'as-needed' ],
    'react/jsx-max-props-per-line': [
      1, {
        maximum: 1,
      },
    ],
    'object-property-newline': [
      'error', {
        allowAllPropertiesOnSameLine: false,
      },
    ],
    'object-curly-newline': [
      'error', {
        ObjectExpression: 'always',
        ObjectPattern: {
          multiline: true,
          minProperties: 3,
        },
        ImportDeclaration: 'never',
        ExportDeclaration: {
          multiline: true,
          minProperties: 3,
        },
      },
    ],
  },
}