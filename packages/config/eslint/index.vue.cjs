module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:vue/base',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/no-layout-rules',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'unused-imports'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: ['**/tsconfig.json'],
    createDefaultProgram: true,
    sourceType: 'module',
    extraFileExtensions: ['.vue']
  },
  rules: {
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/no-duplicate-imports': 'error',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-redeclare': [
      'error',
      {
        ignoreDeclarationMerge: true
      }
    ],
    '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': ['error', 'never'],
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }
    ],
    'vue/attribute-hyphenation': 'error',
    'vue/attributes-order': 'error',
    'vue/component-definition-name-casing': 'error',
    'vue/component-tags-order': [
      'error',
      {
        order: ['script', 'template', 'style']
      }
    ],
    'vue/html-end-tags': 'error',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 1
        },
        multiline: {
          max: 1
        }
      }
    ],
    'vue/multi-word-component-names': 'off',
    'vue/no-lone-template': 'error',
    'vue/no-multiple-slot-args': 'error',
    'vue/no-template-shadow': 'warn',
    'vue/no-v-html': 'error',
    'vue/one-component-per-file': 'error',
    'vue/order-in-components': 'error',
    'vue/prop-name-casing': 'error',
    'vue/require-explicit-emits': 'error',
    'vue/require-default-prop': 'error',
    'vue/require-prop-types': 'error',
    'vue/this-in-template': 'error',
    'vue/v-bind-style': 'error',
    'vue/v-on-event-hyphenation': 'error',
    'vue/v-on-style': 'error',
    'vue/v-slot-style': 'error'
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)']
    }
  ]
}
