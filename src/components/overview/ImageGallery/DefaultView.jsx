import React, { useState, useEffect } from 'react';

const DefaultView = ({state, updateState, updateMainImage, handleToExpand, handleRightArrow, handleLeftArrow}) => {

  let displayStyleImages, displayMainImage;
  if (state.currentStyle) {
    displayStyleImages =
      <div className='styleImages'>
        {state.currentStyle.photos.map((element, index) => { //render all style photos
          return <img
            id={index}
            key={index}
            className='eachStyleImage'
            onClick={updateMainImage}
            src={element.thumbnail_url}/>;
        })}
      </div>;
    if (state.mainImage === '') {
      displayMainImage = <img id ='main' src ={state.currentStyle.photos[0].thumbnail_url}/>;
    } else {
      displayMainImage = <img id ='main' src ={state.mainImage}/>;
    }
  }

  return (
    <>
      <div className='defaultView'>
        {displayStyleImages}
        <div className='mainImage' id='mainImage'>
          <img onClick={handleLeftArrow} className='btnFloating' id='left' src ='https://img.icons8.com/ios-filled/50/000000/long-arrow-left.png'></img>
          <div onClick={handleToExpand} id='wrap'>
            {displayMainImage}
          </div>
          <img onClick={handleRightArrow} className='btnFloating' id='right' src ='https://img.icons8.com/ios-filled/50/000000/long-arrow-right.png'></img>
        </div>
      </div>
    </>
  );
};


export default DefaultView;
