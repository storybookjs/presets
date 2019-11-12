import React, { FC } from 'react';

interface ButtonProps {
  /**
   * Sets the button size.
   */
  variant?: 'small' | 'large';
  /**
   * Disables the button.
   */
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({ variant }) => (
  <button type='button'>click me! {variant}</button>
);
