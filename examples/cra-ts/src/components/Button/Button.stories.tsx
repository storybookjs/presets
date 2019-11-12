import React, { FC } from 'react';
import Button from './Button';

// eslint-disable-next-line import/no-default-export
export default { title: 'Button' };

export const Default: FC = () => (
  <Button>{process.env.REACT_APP_TEST_VAR}</Button>
);
