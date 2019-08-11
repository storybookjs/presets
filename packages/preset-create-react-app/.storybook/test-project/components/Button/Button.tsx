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

const Button: FC<ButtonProps> = ({ children, disabled, variant = 'small' }) => <button disabled={disabled}>{children} {variant}</button>;

export default Button;
