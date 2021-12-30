import React, { useState, useEffect } from 'react';
import DefaultView from './DefaultView.jsx';

const ImageGallery = ({state, updateState}) => {
  const [ currentStylePhotos, updateStylePhotos ] = useState([]);
  const [ clickedImage, updateClickedImage ] = useState(0);

  const updateMainImage = (event) => {
    event.preventDefault();
    let clickedImg = event.target.src;
    let currentImgIndex = currentStylePhotos.indexOf(clickedImg);
    updateClickedImage(currentImgIndex);

    updateState((preValues) => {
      return {...preValues, mainImage: clickedImg};
    });
  };

  const handleToExpand = () => {
    let mainImageElement = document.getElementById('main');

    if (!state.isExpanded) {
      mainImageElement.style.width = '75rem';
      mainImageElement.style.cursor = 'zoom-out';

      updateState((preValues) => {
        return {...preValues, isExpanded: true};
      });
    } else {
      mainImageElement.style.width = '50vh';
      mainImageElement.style.cursor = 'zoom-in';

      updateState((preValues) => {
        return {...preValues, isExpanded: false};
      });
    }
  };

  useEffect(() => {
    helperForArrow();

    //differenciate selected main image//
    let currentImageElement = document.getElementById(clickedImage);
    if (currentImageElement !== null) {
      for (let i = 0; i < state.styleImages.length; i++) {
        document.getElementById(i).style.borderStyle = 'none';
      }
      currentImageElement.style.borderBottom = 'solid';
      currentImageElement.style.borderColor = 'rgb(211, 215, 255)';
      currentImageElement.style.borderWidth = '5px';
    }

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
      updateClickedImage(currentImgIndex + 1);
    }
  }

  const handleLeftArrow = () => {
    let mainImageElement = document.getElementById('left');
    let currentImgIndex = currentStylePhotos.indexOf(state.mainImage);

    if (currentImgIndex !== 0) {
      updateState((preValues) => {
        return {...preValues, mainImage: state.selectedStyle.photos[currentImgIndex - 1].url};
      });
      updateClickedImage(currentImgIndex - 1);
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
        updateMainImage={updateMainImage}
      />
    </>
  );

};


export default ImageGallery;
