import { configure } from '@storybook/react';

configure(
  require.context('./test-project', true, /\.stories\.(mdx|[tj]sx?)$/),
  module
);
