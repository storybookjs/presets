import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from './Button';

storiesOf('Example', module)
  .add('small', () => <Button variant="small" />)
  .add('docgenInfo', () => <div>Docgen: {JSON.stringify(Button.__docgenInfo)}</div>);
