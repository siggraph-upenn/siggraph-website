module.exports = {
  $schema: 'https://json.schemastore.org/eslintrc.json',
  root: true,
  extends: ['printer83mph/next'],
  parserOptions: {
    project: 'tsconfig.json',
  },
  settings: {
    next: {
      rootDir: 'apps/frontend/',
    },
  },
  rules: {
    '@next/next/no-html-link-for-pages': ['error', 'apps/frontend/pages/'],
  },
}
