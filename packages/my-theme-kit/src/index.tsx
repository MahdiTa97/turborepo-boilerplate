import React, { FC, HTMLAttributes, ReactChild } from 'react';
export * from './components/ToggleSwitch';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  /** custom content, defaults to 'the snozzberries taste like snozzberries' */
  children?: ReactChild;
}

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
/**
 * A custom Thing component. Neat!
 */
export const Thing: FC<Props> = ({ children }) => (
  // We are adding these classes here
  <div className="mt-10 bg-red-100 p-5 rounded-md">
    {children || `the snozzberries taste like snozzberries`}
  </div>
);
