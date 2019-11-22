import React from 'react';
import * as circleSvg from './circle.svg';

export const Icon = () => (
  <div dangerouslySetInnerHTML={{ __html: circleSvg }} />
);
