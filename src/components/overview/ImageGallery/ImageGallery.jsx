import React, { useState, useEffect } from 'react';
import DefaultView from './DefaultView.jsx';

const ImageGallery = ({state, updateState}) => {
  const [ currentStylePhotos, updateStylePhotos ] = useState([]);
  const [ clickedImageIndex, updateClickedImageIndex ] = useState(0);

  //update main image//
  const updateMainImage = (event) => {
    event.preventDefault();
    const clickedImg = event.target.src;
    const currentImgIndex = currentStylePhotos.indexOf(clickedImg);
    updateClickedImageIndex(currentImgIndex);

    updateState((preValues) => {
      return {...preValues, mainImage: clickedImg};
    });
  };

  useEffect(() => {
    updateCurrentStylePhotosUrl();

    //differenciate selected main image//
    const currentImageElement = document.getElementById(clickedImageIndex);
    if (currentImageElement !== null) {
      for (let i = 0; i < state.styleImages.length; i++) {
        document.getElementById(i).style.borderStyle = 'none';
        document.getElementById(i).style.opacity = '1';
      }
      currentImageElement.style.borderBottom = 'solid';
      currentImageElement.style.opacity = '0.4'
      currentImageElement.style.borderWidth = '6px';
    }

  }, [state])

  //arrow click function//
  const updateCurrentStylePhotosUrl = () => {
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
      updateClickedImageIndex(currentImgIndex + 1);
    }
  }

  const handleLeftArrow = () => {
    let mainImageElement = document.getElementById('left');
    let currentImgIndex = currentStylePhotos.indexOf(state.mainImage);

    if (currentImgIndex !== 0) {
      updateState((preValues) => {
        return {...preValues, mainImage: state.selectedStyle.photos[currentImgIndex - 1].url};
      });
      updateClickedImageIndex(currentImgIndex - 1);
    }
  }

  //expandedView function -- mousemove//
  const handleToExpand = (event) => {
    const mainImageWrapElement = document.getElementById('wrap');
    const mainImageElement = document.getElementById('main');
    mainImageWrapElement.addEventListener('mousemove', (event) => {
      let X = event.clientX - mainImageWrapElement.offsetLeft;
      let Y = event.clientY - mainImageWrapElement.offsetTop;

      let mWidth = mainImageWrapElement.offsetWidth;
      let mHeight = mainImageWrapElement.offsetHeight;

      X = X / mWidth * 100;
      Y = Y / mHeight * 100;

      mainImageElement.style.transform = 'translate(-'+X+'%, -'+Y+'%) scale(2.0)';
    })

    mainImageWrapElement.addEventListener('mouseleave', () => {
      mainImageElement.style.transform = 'scale(1)'
    })
  };

  return (
    <>
      <DefaultView
        state={state}
        updateState={updateState}
        handleToExpand={handleToExpand}
        handleRightArrow={handleRightArrow}
        handleLeftArrow={handleLeftArrow}
        updateCurrentStylePhotosUrl={updateCurrentStylePhotosUrl}
        updateMainImage={updateMainImage}
      />
    </>
  );
};


export default ImageGallery;
