import React from 'react';
import { storiesOf } from '@storybook/react';
import Logo from './Logo';

storiesOf('Logo', module)
  .add('Default', () => {
    return <Logo />;
  });
