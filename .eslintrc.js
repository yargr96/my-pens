module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'eslint:recommended',
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
    plugins: ['@typescript-eslint'],
    rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'no-console': 'warn',
        camelcase: 'error',
        '@typescript-eslint/indent': 'off',
        indent: ['error', 4],
        'no-restricted-exports': 'off',
        // todo fix extensions
        'import/extensions': 'off',
        'import/order': ['error', {
            alphabetize: {
                order: 'asc',
            },
        }],
    },
};
