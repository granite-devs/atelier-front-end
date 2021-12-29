import React, { useState, useEffect } from 'react';

const DefaultView = ({state, updateState}) => {
  const [ mainImage, setMainImage ] = useState('');

  const updateMainImage = (event) => {
    event.preventDefault();
    let clickedImg = event.target.src;
    setMainImage(clickedImg);
  };

  return (
    <div className='defaultView'>
      <div className='styleImages'>
        {state.styleImages.map((element, idx) => { //render all style photos
          return <img
            style = {{
              width: '9vh',
              height: '9vh',
              cursor: 'pointer'
            }}
            id = {idx}
            onClick = {updateMainImage}
            src={element.url}/>;
        })}
      </div>
      <div className='mainImage'>
        {(state.styleImages[0] !== undefined && mainImage === '') ?
          <img id = 'main' src = {state.styleImages[0].url} style = {{width: '75vh', height: '54vh'}}/> :
          <img id = 'main' src = {mainImage} style = {{width: '75vh', height: '54vh'}}/>
        }
      </div>
    </div>
  );
};


export default DefaultView;
