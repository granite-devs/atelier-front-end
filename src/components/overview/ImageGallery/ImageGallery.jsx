import React, { useState, useEffect } from 'react';
import DefaultView from './DefaultView.jsx';

const ImageGallery = ({state, updateState}) => {
  return (
    <>
      <DefaultView state={state} updateState={updateState}/>
    </>
  );

};


export default ImageGallery;
