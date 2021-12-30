import React, { useState, useEffect } from 'react';
import DefaultView from './DefaultView.jsx';

const ImageGallery = ({state, updateState}) => {
  const [ currentStylePhotos, updateStylePhotos ] = useState([]);
  const [ clickedImage, updateClickedImage ] = useState(0);

  //update main image//
  const updateMainImage = (event) => {
    event.preventDefault();
    let clickedImg = event.target.src;
    let currentImgIndex = currentStylePhotos.indexOf(clickedImg);
    updateClickedImage(currentImgIndex);

    updateState((preValues) => {
      return {...preValues, mainImage: clickedImg};
    });
  };

  useEffect(() => {
    helperForArrow();

    //differenciate selected main image//
    let currentImageElement = document.getElementById(clickedImage);
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

      console.log(X,Y)
      mainImageElement.style.transform = 'translate(-'+X+'%, -'+Y+'%) scale(1.6)';
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
        helperForArrow={helperForArrow}
        updateMainImage={updateMainImage}
      />
    </>
  );
};


export default ImageGallery;
