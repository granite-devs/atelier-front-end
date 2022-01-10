import React from 'react';

const CharacteristicBar = (props) => {

  const { name, value, meanings } = props;
  const fraction = (value / 5) * 100;

  return (
    <div className='characteristics'>
      <span className='leftSpan'>{name}</span>
      <svg width="200" height="20">
        <rect x="8" y="0" rx="5" ry="5" width="184" height="10" style={{
          fill: 'lightgray',
        }} />
        <polygon
          points={`
            ${8 + (fraction * 1.84)},${4}
            ${8 + (fraction * 1.84) + 8},${20}
            ${8 + (fraction * 1.84) - 8},${20}
          `}
          style={{
            fill: 'gray',
            fillRule: 'evenodd'
          }} />
      </svg>
      <div className='rangeMeanings'>
        <span>{meanings[0]}</span>
        <span>{meanings[1]}</span>
      </div>
    </div>
  );
};

export default CharacteristicBar;
