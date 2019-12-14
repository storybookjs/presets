import React from 'react';
import Button from './Button';

export default { title: 'Button', component: Button };

export const Default = () => <Button>{process.env.REACT_APP_TEST_VAR}</Button>;
