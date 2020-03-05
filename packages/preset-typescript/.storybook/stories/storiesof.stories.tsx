import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from './Button';

interface IComponentWithDocgenInfo {
  __docgenInfo?: any;
}

const getDocgen = (component: any) => {
  return (component as IComponentWithDocgenInfo).__docgenInfo;
};

storiesOf('Example', module)
  .add('small', () => <Button variant='small' />)
  .add('docgenInfo', () => {
    return (
      <>
        <strong>Docgen:</strong>
        <pre>{JSON.stringify(getDocgen(Button), null, 2)}</pre>
      </>
    );
  });
