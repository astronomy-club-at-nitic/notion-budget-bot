// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Exposes utils like `test` and `expect` to global scope
  },
});
