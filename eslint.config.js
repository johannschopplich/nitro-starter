import antfu from '@antfu/eslint-config'

export default await antfu(
  {
    stylistic: false,
    ignores: ['tsconfig.json'],
  },
  {
    rules: {
      'node/prefer-global/buffer': 'off',
      'node/prefer-global/process': 'off',
    },
  },
)
