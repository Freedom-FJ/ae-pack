import { defineConfig } from '@ice/pkg';

// https://pkg.ice.work/reference/config-list
export default defineConfig({
  sourceMaps: true,
  transform: {
    formats: ['esm', 'es2017'],
  },
});
