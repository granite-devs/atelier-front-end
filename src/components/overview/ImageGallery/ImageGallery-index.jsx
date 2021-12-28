import React, { useState, useEffect } from 'react';
import DefaultView from './DefaultView.jsx';

const ImageGallery = ({selectedStyle}) => {

  return (
    <>
      <DefaultView photos={selectedStyle.photos}/>
    </>
  );

};


export default ImageGallery;
