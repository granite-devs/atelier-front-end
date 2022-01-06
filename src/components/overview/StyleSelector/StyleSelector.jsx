import React, { useState, useEffect } from 'react';

const StyleSelector = ({state, updateState}) => {
  const [ selectedStyleIndex, updateSelectedStyleIndex ] = useState(0);
  const [ theFirstPhotoOfEachStyle, updateDefaultPhoto ] = useState([]);

  useEffect (() => {
    let defaultStylePhotoArray = [];
    if (state.selectedProductStyle[0] !== undefined) {
      state.selectedProductStyle.forEach ((eachStyle) => {
        defaultStylePhotoArray.push(eachStyle.photos[0].thumbnail_url);
      });
      updateDefaultPhoto(defaultStylePhotoArray);
    }

    if (document.getElementById('style0') !== null && state.currentStyle.photos[0] !== undefined) {
      for (let i = 0; i < 8; i++) {
        if (document.getElementById(`style${i}`)) {
          // document.getElementById(`style${i}`).style.border = 'none'; //border makes the icon moves
          document.getElementById(`style${i}`).style.opacity = '1';
        }
      }
      // document.getElementById(`style${selectedStyleIndex}`).style.borderStyle = 'outset';
      document.getElementById(`style${selectedStyleIndex}`).style.opacity = '0.3';
    }
  }, [state]);

  const updateCurrentStyle = (event) => {
    event.preventDefault();
    let selectedStyleIndex = event.target.id[5]; //since the id is style+Index
    let selectedStyle = state.selectedProductStyle[selectedStyleIndex];
    updateSelectedStyleIndex(selectedStyleIndex);

    updateState((preValues) => {
      return {
        ...preValues,
        currentStyle: selectedStyle,
        mainImage: selectedStyle.photos[0].thumbnail_url
      };
    });

    //if the style has salePrice
    if (selectedStyle.sale_price !== null) {
      let priceDesc = `Now On Sale! ${state.selectedProductDefaultPrice} -> $${Math.round(selectedStyle.sale_price)}`;
      updateState((preValues) => {
        return {
          ...preValues,
          currentPrice: priceDesc
        };
      });
    }
  };

  return (
    <>
      <div id='styleSelector'>
        <div id='styleTitle'>
          Style: <b>{state.currentStyle.name}</b>
        </div>
        <div id='styleSelection'>
          <div id='styleTop'>
            {theFirstPhotoOfEachStyle.map((element, index) => {
              if (index < 4) {
                return <img
                  onClick={updateCurrentStyle}
                  className='eachStyleSelection'
                  key={index}
                  id={`style${index}`}
                  src={element}>
                </img>;
              }
            })}
          </div>
          <div id='styleBottom'>
            {theFirstPhotoOfEachStyle.map((element, index) => {
              if (index > 3 && index < 8) {
                return <img
                  onClick={updateCurrentStyle}
                  className='eachStyleSelection'
                  key={index}
                  id={`style${index}`}
                  src={element}>
                </img>;
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default StyleSelector;
