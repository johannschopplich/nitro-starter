import antfu from '@antfu/eslint-config'

export default await antfu(
  {
    stylistic: false,
  },
  {
    files: ['**/*.tsx'],
    rules: {
      'unused-imports/no-unused-imports': 'off',
    },
  },
)
