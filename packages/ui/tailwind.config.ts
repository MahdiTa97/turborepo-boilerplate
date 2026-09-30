import type { Config } from 'tailwindcss';
import sharedConfig from '@repo/tailwind-config';

const config: Pick<Config, 'presets' | 'content'> = {
  content: [
    './src/**/*.tsx',
    '../../node_modules/daisyui/dist/**/*.js',
    '../../node_modules/react-daisyui/dist/**/*.js',
  ],
  presets: [sharedConfig],
  /*
   * Styles are shared with the apps, so no `prefix` is set here by default.
   * If you ever need to isolate these classes from app-level styles,
   * add `prefix: 'ui-'` and update the classes in `src/` to match.
   */
};

export default config;