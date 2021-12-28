import React, { useState, useEffect } from 'react';

const DefaultView = ({photos}) => {
  const [ isShowing, setIsShowing] = useState([]);
  const [ mainImage, setMainImage ] = useState(false);

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
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
        {isShowing.map((element, idx) => { //render all style photos
          return <img
            id = {idx}
            style = {{
              width: '9vh',
              height: '9vh',
              cursor: 'pointer',
              justifyContent: 'space-around'
            }}
            onClick = {updateMainImage}
            src={element.url}/>;
        })}
      </div>
      <div //render the main style photo (default: the first style photo)
        style={{
          display: 'flex',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          width: '100vh',
          height: '90vh',
          cursor: 'zoom-in',
          objectFit: 'cover'
        }}>
        {(isShowing[0] !== undefined && mainImage === false) ?
          <img id = 'main' src = {isShowing[0].url}/> :
          <img id = 'main' src = {mainImage}/>
        }
      </div>
    </div>
  );
};


export default DefaultView;
