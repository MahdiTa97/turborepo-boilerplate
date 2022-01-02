// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
import '../src/assets/tailwind.css';

export const parameters = {
  // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
  actions: { argTypesRegex: '^on.*' },
};
