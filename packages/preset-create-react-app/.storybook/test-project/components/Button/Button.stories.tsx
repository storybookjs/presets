import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';

const getDocgen = (component) => {
  return component.__docgenInfo;
}
  
storiesOf('components/Button', module)
  .add('Default', () => {
    return <Button>{process.env.REACT_APP_TEST_VAR}</Button>;
  })
  .add('Docgen Info', () => {
    return (
      <>
        <pre>{JSON.stringify(getDocgen(Button), null, 2)}</pre>
      </>
    );
  });
