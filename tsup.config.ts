import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['drizzle.config.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
});