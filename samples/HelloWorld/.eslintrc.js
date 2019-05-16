module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: ['plugin:vue/essential', '@vue/prettier', '@vue/typescript'],

  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
  },

  rules: {
    'array-callback-return': 2,
    'no-constant-condition': [
      2,
      {
        checkLoops: false,
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-shadow-restricted-names': 2,
    'no-caller': 2,
    'no-div-regex': 2,
    'no-eval': 2,
    'no-loop-func': 2,
    'no-multi-str': 2,
    'no-proto': 2,
    'no-return-assign': 2,
    'no-unmodified-loop-condition': 2,
    'no-unused-expressions': [
      2,
      {
        allowTaggedTemplates: true,
      },
    ],
    'no-useless-call': 2,
    'no-useless-concat': 2,
    'no-with': 2,
    'no-undef-init': 2,
    'no-unused-vars': 0,
    'spaced-comment': [
      2,
      'always',
      {
        block: { exceptions: ['*'] },
        line: { exceptions: ['-', '='], markers: ['/'] },
      },
    ],
    'no-var': 2,
    'no-useless-rename': 2,
    'no-restricted-imports': [
      2,
      {
        paths: [
          {
            name: 'emotion',
            message: 'Please import emotion/macro instead.',
          },
        ],
      },
    ],
    'prefer-const': [
      2,
      {
        destructuring: 'all',
      },
    ],
    'id-blacklist': [2, 'h' /* used for Vue's JSX createElement binding. */],
    'no-use-before-define': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/no-angle-bracket-type-assertion': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-object-literal-type-assertion': 0,
    '@typescript-eslint/no-require-imports': 0,
    '@typescript-eslint/prefer-interface': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/restrict-plus-operands': 0,
    '@typescript-eslint/no-use-before-define': [
      2,
      {
        functions: false,
        typedefs: false,
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        vars: 'all',
        argsIgnorePattern: '^_|_$',
        ignoreRestSiblings: false,
        caughtErrors: 'none',
      },
    ],
  },
}
