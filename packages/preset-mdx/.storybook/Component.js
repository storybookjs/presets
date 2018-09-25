import React from 'react';

const style = {
  backgroundColor: '#1aaa00',
  color: '#ffffff',
  fontFamily: 'Arial',
  display: 'inline-block',
  padding: '20px',
  cursor: 'pointer'
};

function MyComponent(props) {
  const { children = null, onClick = () => {} } = props;

  return (
    <div style={style} onClick={onClick}>
      Here is a cool JSX
      { children }
    </div>
  )
}

export default MyComponent;
