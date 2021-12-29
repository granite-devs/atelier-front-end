import React, { useState, useEffect } from 'react';
import DefaultView from './DefaultView.jsx';

const ImageGallery = ({state, updateState}) => {

  const handleToExpand = () => {
    let mainImageElement = document.getElementById('main');
    mainImageElement.style.width = '75rem';
  };

  return (
    <>
      <DefaultView state={state} updateState={updateState} handleToExpand={handleToExpand}/>
    </>
  );

};


export default ImageGallery;
