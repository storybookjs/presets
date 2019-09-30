import { addDecorator, configure } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

addDecorator(withInfo); 

const req = require.context('./test-project', true, /.stories.(j|t)sx?$/);
function loadStories () {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
