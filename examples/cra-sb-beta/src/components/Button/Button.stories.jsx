import React from 'react';
import Button from './Button';

export default { title: 'Button' };

export const Default = () => <Button>{process.env.REACT_APP_TEST_VAR}</Button>;
