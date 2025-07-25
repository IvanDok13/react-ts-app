const Configuration = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation changes
        'style', // Code style changes (e.g., formatting)
        'refactor', // Code refactoring
        'test', // Adding or updating tests
        'chore', // Maintenance tasks (e.g., updating dependencies)
        'revert', // Reverting a previous commit
      ],
    ],
    'subject-case': [2, 'always', 'lower-case'],
  },
};

export default Configuration;
