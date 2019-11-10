import React from 'react';
import logo, { ReactComponent as LogoSvg } from '../../assets/logo.svg';

const Button = ({ children, disabled, variant = 'small' }) => (
  <button disabled={disabled}>
    <img src={logo} alt='Logo' />
    <LogoSvg />
    {children} {variant}
  </button>
);

export default Button;
