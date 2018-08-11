import React from 'react';
import styles from './Button.scss';

function Button(props) {
  const { children } = props;

  return <button className={styles.container}>{children}</button>;
}

export default Button;
