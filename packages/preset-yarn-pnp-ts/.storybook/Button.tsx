import React from 'react';

interface ButtonProps {
  variant: 'small' | 'large';
}

export const Button = ({ variant }: ButtonProps) => (
  <button type="button">click me! {variant}</button>
);
