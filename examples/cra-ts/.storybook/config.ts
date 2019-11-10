import { configure } from '@storybook/react';
import '../src/App.css';

configure(require.context('../src', true, /\.stories\.(mdx|tsx?)$/), module);
