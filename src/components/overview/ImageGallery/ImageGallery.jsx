import React, { useState, useEffect } from 'react';
import DefaultView from './DefaultView.jsx';

const ImageGallery = ({state, updateState}) => {
  const [ currentStylePhotos, updateStylePhotos] = useState([]);

  const handleToExpand = () => {
    let mainImageElement = document.getElementById('main');

    if (!state.expanded) {
      mainImageElement.style.width = '75rem';
      mainImageElement.style.cursor = 'zoom-out';

      updateState((preValues) => {
        return {...preValues, expanded: true};
      });
    } else {
      mainImageElement.style.width = '75vh';
      mainImageElement.style.cursor = 'zoom-in';

      updateState((preValues) => {
        return {...preValues, expanded: false};
      });
    }
  };

  useEffect(() => {
    helperForArrow();
  }, [state])

  const helperForArrow = () => {
    let urlOnlyArray = [];
    for (let i = 0; i < state.styleImages.length; i++) {
      urlOnlyArray.push(state.styleImages[i].url);
    }
    updateStylePhotos(urlOnlyArray);
  }

  const handleRightArrow = () => {
    let mainImageElement = document.getElementById('right');
    let currentImgIndex = currentStylePhotos.indexOf(state.mainImage);

    if (currentImgIndex !== state.styleImages.length - 1) {
      updateState((preValues) => {
        return {...preValues, mainImage: state.selectedStyle.photos[currentImgIndex + 1].url};
      });
    }
  }

  const handleLeftArrow = () => {
    let mainImageElement = document.getElementById('left');
    let currentImgIndex = currentStylePhotos.indexOf(state.mainImage);

    if (currentImgIndex !== 0) {
      updateState((preValues) => {
        return {...preValues, mainImage: state.selectedStyle.photos[currentImgIndex - 1].url};
      });
    }

  }

  return (
    <>
      <DefaultView
        state={state}
        updateState={updateState}
        handleToExpand={handleToExpand}
        handleRightArrow={handleRightArrow}
        handleLeftArrow={handleLeftArrow}
        helperForArrow={helperForArrow}
      />
    </>
  );

};


export default ImageGallery;
