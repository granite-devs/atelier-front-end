import React, { useState, useEffect } from 'react';

const DefaultView = ({photos}) => {
  const [ isShowing, setIsShowing] = useState([]);
  const [ mainImage, setMainImage ] = useState([]);

  useEffect (() => {
    if (photos) {
      setIsShowing(photos);
      setMainImage(photos[0].url);
    }
  });

  const handleMainImage = (event) => {
    event.preventDefault();
    let clickedImg = event.target.src;
    console.log(clickedImg);
    setMainImage(clickedImg);
  };

  return (
    <div>
      {isShowing.map((element) => {
        return <img onClick = {handleMainImage} width='100px' src={element.url}/>;
      })}
    </div>
  );
};


export default DefaultView;
