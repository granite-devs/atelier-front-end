import React, { useState, useEffect } from 'react';

const DefaultView = ({photos}) => {
  const [ isShowing, setIsShowing] = useState([]);
  const [ mainImage, setMainImage ] = useState([]);

  useEffect (() => {
    if (photos) {
      setIsShowing(photos);
    }
  });


  const handleMainImage = (event) => {
    event.preventDefault();
    let clickedImg = event.target.src;
    setMainImage(clickedImg);
  };

  return (
    <div>
      {isShowing.map((element, idx) => {
        return <img id = {idx} onClick = {handleMainImage} width='100px' src={element.url}/>;
      })}
    </div>
  );
};


export default DefaultView;
