import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from "antd"

storiesOf('Example', module)
  .add('Button', () => {
    return <Button type="primary">Click</Button>;
  });
