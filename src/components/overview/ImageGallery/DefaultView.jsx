import React, { useState, useEffect } from 'react';

const DefaultView = ({photos}) => {
  const [ isShowing, setIsShowing] = useState([]);

  useEffect (() => {
    if (photos) {
      setIsShowing(photos);
    }
  });

  return (
    <div>
      {isShowing.map((element) => {
        return <img width='100px' src={element.url}/>
      })}
    </div>
  );
};


export default DefaultView;
