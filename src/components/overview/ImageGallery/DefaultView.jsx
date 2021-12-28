import React, { useState, useEffect } from 'react';

const DefaultView = ({photos}) => {
  const [ isShowing, setIsShowing] = useState([]);
  const [ mainImage, setMainImage ] = useState([]);

  useEffect (() => {
    if (photos) {
      setIsShowing(photos);
    }
  });


  const updateMainImage = (event) => {
    event.preventDefault();
    let clickedImg = event.target.src;
    setMainImage(clickedImg);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
      {isShowing.map((element, idx) => {
        return <img
          id = {idx}
          style = {{
            width: '9vh',
            height: '9vh',
            cursor: 'pointer',
            objectFit: 'cover'
          }}
          onClick = {updateMainImage}
          src={element.url}/>;
      })}
    </div>
  );
};


export default DefaultView;
