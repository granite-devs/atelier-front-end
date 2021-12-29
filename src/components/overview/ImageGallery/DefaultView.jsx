import React, { useState, useEffect } from 'react';

const DefaultView = ({state, updateState}) => {
  const [ mainImage, setMainImage ] = useState(false);

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
        {state.styleImages.map((element, idx) => { //render all style photos
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
        {(state.styleImages[0] !== undefined && mainImage === false) ?
          <img id = 'main' src = {state.styleImages[0].url}/> :
          <img id = 'main' src = {mainImage}/>
        }
      </div>
    </div>
  );
};


export default DefaultView;
