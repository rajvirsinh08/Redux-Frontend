import { Linter } from 'eslint';

const config: Linter.Config = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react-hooks'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    quotes: ['error', 'double'],
    semi: ['error', 'always'],
    eqeqeq: 'error',
  },
};

export default config;

// {
//   "env": {
//     "browser": true,
//     "es2021": true
//   },
//   "extends": ["eslint:recommended", "plugin:react/recommended"],
//   "plugins": ["react-hooks"],
//   "parserOptions": {
//     "ecmaVersion": 12,
//     "sourceType": "module"
//   },
//   "rules": {
//     "quotes": ["error", "single"],
//     "semi": ["error", "always"],
//     "eqeqeq": "error"
//   }
// }
