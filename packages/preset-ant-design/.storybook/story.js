import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from 'antd';

storiesOf('Example', module).add('Button', () => (
  <Button type='primary'>Click</Button>
));
