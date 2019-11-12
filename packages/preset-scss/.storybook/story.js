import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';

storiesOf('Example', module).add('Default', () => {
  return <Button>Button</Button>;
});
