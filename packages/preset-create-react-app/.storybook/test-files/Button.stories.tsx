import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';

storiesOf('Button', module)
  .add('Default', () => {
    return <Button>{process.env.REACT_APP_TEST_VAR}</Button>;
  });
