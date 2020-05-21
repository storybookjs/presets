/* eslint-disable react/prop-types, react/button-has-type */
import React, { FC, ReactNode } from 'react';
import logo, { ReactComponent as LogoSvg } from '../../assets/logo.svg';
import styles from './Button.module.scss';
import { SomeProps } from './someProps';

interface ButtonProps extends SomeProps {
  /**
   * The content of the button.
   */
  children: ReactNode;
  /**
   * Sets the button size.
   */
  variant: 'small' | 'large';
  /**
   * Disables the button.
   */
  disabled?: boolean;
}

// NOTE: Right now FC<Props> is not working.
const Button: FC<ButtonProps> = ({
  children,
  disabled,
  variant,
}: ButtonProps) => (
  <button disabled={disabled} className={styles.Button}>
    <img src={logo} alt='Logo' />
    <LogoSvg />
    {children} {variant}
  </button>
);

// eslint-disable-next-line import/no-default-export
export default Button;
