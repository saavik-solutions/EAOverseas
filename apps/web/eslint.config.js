import sharedConfig from '@workspace/eslint-config'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  ...sharedConfig,
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { 'varsIgnorePattern': '^React$' }]
    }
  }
])
