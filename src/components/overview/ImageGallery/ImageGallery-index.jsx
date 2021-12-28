import React from 'react';
import DefaultView from './DefaultView.jsx';

const ImageGallery = ({selectedStyle}) => {

  return (
    <>
      <DefaultView photos={selectedStyle.photos}/>
    </>
  );

};


export default ImageGallery;
