// This file is used by lint-staged to run linting and formatting on staged files

export default {
  '**/*.{js,jsx,ts,tsx}': 'pnpm eslint',
  '**/*.{js,jsx,ts,tsx,md,html,css,json,yaml,yml}': 'pnpm prettier --ignore-unknown --check',
};
