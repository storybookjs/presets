import React from 'react';
import { storiesOf } from '@storybook/react';
import Logo from './Logo';

const getDocgen = (component) => {
  return component.__docgenInfo;
}

storiesOf('components/Logo', module)
  .add('Default', () => {
    return <Logo />;
  })
  .add('Docgen Info', () => {
    return (
      <>
        <pre>{JSON.stringify(getDocgen(Logo), null, 2)}</pre>
      </>
    );
  });
