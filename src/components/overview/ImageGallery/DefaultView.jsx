import React, { useState, useEffect } from 'react';

const DefaultView = ({state, updateState, updateMainImage, handleToExpand, handleRightArrow, handleLeftArrow}) => {


  return (
    <>
      {(state.currentStyle.photos !== undefined) && (
        <div className='defaultView'>
          <div className='styleImages'>
            {state.currentStyle.photos.map((element, idx) => { //render all style photos
              return <img
                id={idx}
                key={idx}
                className='eachStyleImage'
                onClick={updateMainImage}
                src={element.url}/>;
            })}
          </div>
          <div className='mainImage' id='mainImage'>
            <img onClick={handleLeftArrow} className='btnFloating' id='left' src ='https://img.icons8.com/ios-filled/50/000000/long-arrow-left.png'></img>
            {(state.currentStyle.photos[0] !== undefined && state.mainImage === '') ?
              <div id='wrap'>
                <img id ='main' src ={state.currentStyle.photos[0].url}/>
              </div> :
              <div onClick={handleToExpand} id='wrap'>
                <img id ='main' src ={state.mainImage}/>
              </div>
            }
            <img onClick={handleRightArrow} className='btnFloating' id='right' src ='https://img.icons8.com/ios-filled/50/000000/long-arrow-right.png'></img>
          </div>
        </div>
      )}
    </>
  );
};


export default DefaultView;
