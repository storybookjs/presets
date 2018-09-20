import React from 'react';

const style = {
  backgroundColor: '#1aaa00',
  color: '#ffffff',
  display: 'inline-block',
  padding: '20px'
};

function MyComponent(props) {
  const { children = null } = props;

  return (
    <div style={style}>
      Here is a cool JSX
      { children }
    </div>
  )
}

export default MyComponent;
