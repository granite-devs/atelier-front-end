import React from 'react';

const Star = (props) => {

  const fraction = Math.round(props.fraction * 4) * 25;

  return (
    <svg width="20" height="20">
      <defs>
        <linearGradient id={`grad${fraction}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset={`${fraction}%`} style={{stopColor: 'gray', stopOpacity: 1}} />
          <stop offset={`${fraction}%`} style={{stopColor: 'white', stopOpacity: 0}} />
        </linearGradient>
      </defs>
      <polygon points="0,7.65 6.91,6.59 10,0 13.09,6.59 20,7.65 15,12.77 16.18,20 10,16.59 3.82,20 5,12.77"
        style={{
          fill: `url(#grad${fraction})`,
          stroke: 'gray',
          strokeWidth: 1,
          fillRule: 'evenodd'
        }} />
    </svg>
  );
};

export default Star;
