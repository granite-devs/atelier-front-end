import React, { useState, useEffect } from 'react';
import DefaultView from './DefaultView.jsx';

const ImageGallery = ({state, updateState}) => {

  const handleToExpand = () => {
    let mainImageElement = document.getElementById('main');

    if (!state.expanded) {
      mainImageElement.style.width = '75rem';
      mainImageElement.style.cursor = 'zoom-out';

      updateState((preValues) => {
        return {
          ...preValues,
          expanded: true
        };
      });
    } else {
      mainImageElement.style.width = '75vh';
      mainImageElement.style.cursor = 'zoom-in';

      updateState((preValues) => {
        return {
          ...preValues,
          expanded: false
        };
      });
    }
  };

  return (
    <>
      <DefaultView state={state} updateState={updateState} handleToExpand={handleToExpand}/>
    </>
  );

};


export default ImageGallery;
