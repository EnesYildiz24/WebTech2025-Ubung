import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    include: ['tests/**/*.test.{ts,tsx}'],
  },
  // @ts-expect-error  Vitest-Typen kennen typecheck noch nicht
  typecheck: {
    tsconfig: './tsconfig.vitest.json',
  }
});