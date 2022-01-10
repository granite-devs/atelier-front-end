import React, { useState, useEffect } from 'react';

const DefaultView = ({state, updateState, updateMainImage, handleToExpand, handleRightArrow, handleLeftArrow}) => {

  let displayStyleImages, displayMainImage;
  if (state.currentStyle.photos) {
    displayStyleImages =
      <div className='styleImages'>
        {state.currentStyle.photos.map((element, index) => { //render all style photos
          return <img
            id={index}
            key={index}
            alt='eachStyleImage'
            className='eachStyleImage'
            onClick={updateMainImage}
            src={element.thumbnail_url}/>;
        })}
      </div>;
    if (state.mainImage === '') {
      displayMainImage = <img id ='main' alt='mainImage' src ={state.currentStyle.photos[0].thumbnail_url}/>;
    } else {
      displayMainImage = <img id ='main' alt='mainImage' src ={state.mainImage}/>;
    }
  }

  return (
    <>
      <div className='defaultView'>
        {displayStyleImages}
        <div className='mainImage' id='mainImage'>
          <img onClick={handleLeftArrow}
            alt='leftArrow'
            className='btnFloating'
            id='left'
            src ='https://i.ibb.co/r0GN44X/image.png'>
          </img>
          <div onClick={handleToExpand} id='wrap'>
            {displayMainImage}
          </div>
          <img onClick={handleRightArrow}
            alt='rightArrow'
            className='btnFloating'
            id='right'
            src ='https://i.ibb.co/k3GTgnr/arrow-icon-1177.png'>
          </img>
        </div>
      </div>
    </>
  );
};


export default DefaultView;
