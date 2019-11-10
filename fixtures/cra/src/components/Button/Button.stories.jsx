import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';

storiesOf('components/Button', module)
  .addParameters({ component: Button })
  .add('Default', () => {
    return <Button>{process.env.REACT_APP_TEST_VAR}</Button>;
  });
