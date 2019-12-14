/* eslint-disable react/prop-types, react/button-has-type */
import React from 'react';
import propTypes from 'prop-types';
import logo, { ReactComponent as LogoSvg } from '../../assets/logo.svg';
import styles from './Button.module.scss';

const Button = ({ children, disabled, variant = 'small' }) => (
  <button disabled={disabled} className={styles.Button}>
    <img src={logo} alt='Logo' />
    <LogoSvg />
    {children} {variant}
  </button>
);

/* eslint-disable react/require-default-props */
Button.propTypes = {
  disabled: propTypes.bool,
  variant: propTypes.oneOf(['small', 'large']),
};

export default Button;
