import React from 'react';

const BreakdownBar = (props) => {

  const { stars, reviews, total, onClick } = props;
  const fraction = (reviews / total) * 100;

  return (
    <div className='breakdownBar' onClick={() => onClick(stars)}>
      <span className='leftSpan'>{`${stars} Stars`}</span>
      <svg width="200" height="10">
        <defs>
          <linearGradient id={`lineGrad${fraction}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset={`${fraction}%`} style={{stopColor: 'rgb(23, 189, 17)', stopOpacity: 1}} />
            <stop offset={`${fraction}%`} style={{stopColor: 'gray', stopOpacity: 1}} />
          </linearGradient>
        </defs>
        <rect x="0" y="0" rx="5" ry="5" width="200" height="10" style={{
          stroke: 'gray',
          fill: `url(#lineGrad${fraction})`,
          strokeWidth: 0,
        }} />
      </svg>
      <span className='rightSpan'>{reviews}</span>
    </div>
  );
};

export default BreakdownBar;
