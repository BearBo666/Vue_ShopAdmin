module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],

  parserOptions: {
    parser: 'babel-eslint'
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/no-async-in-computed-properties': 'off',
    'vue/no-dupe-keys': 'off',
    'vue/no-duplicate-attributes': 'off',
    'vue/no-parsing-error': 'off',
    'vue/no-reserved-keys': 'off',
    'vue/no-shared-component-data': 'off',
    'vue/no-side-effects-in-computed-properties': 'off',
    'vue/no-template-key': 'off',
    'vue/no-textarea-mustache': 'off',
    'vue/no-unused-components': 'off',
    'vue/no-unused-vars': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    'vue/require-component-is': 'off',
    'vue/require-prop-type-constructor': 'off'
  },

  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ]
}
