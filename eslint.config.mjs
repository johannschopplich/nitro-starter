// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: false,
}).append({
  files: ['**/*.tsx'],
  rules: {
    'unused-imports/no-unused-imports': 'off',
  },
})
