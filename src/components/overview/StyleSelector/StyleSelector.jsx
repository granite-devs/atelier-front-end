import React, { useState, useEffect } from 'react';

const StyleSelector = ({state, updateState}) => {
  const [ selectedStyleIndex, updateSelectedStyleIndex ] = useState(0);
  const [ theFirstPhotoOfEachStyle, updateDefaultPhoto ] = useState([]);

  useEffect (() => {
    let defaultStylePhotoArray = [];
    if (state.selectedProductStyle[0] !== undefined) {
      state.selectedProductStyle.forEach ((eachStyle) => {
        defaultStylePhotoArray.push(eachStyle.photos[0].url);
      });
      updateDefaultPhoto(defaultStylePhotoArray);
    }

    if (document.getElementById('style0') !== null) {
      for (let i = 0; i < 6; i++) {
        document.getElementById(`style${i}`).style.border = 'none';
        document.getElementById(`style${i}`).style.opacity = '1';
      }
      document.getElementById(`style${selectedStyleIndex}`).style.border = 'solid';
      document.getElementById(`style${selectedStyleIndex}`).style.opacity = '0.4';
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
        mainImage: selectedStyle.photos[0].url
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
      {state !== undefined && theFirstPhotoOfEachStyle[0] !== undefined && (
        <>
          <div id='styleSelector'>
            <div id='styleTitle'>
              STYLE : <b>{state.currentStyle.name}</b>
            </div>
            <div id='styleSelection'>
              <div id='StyleTop'>
                {theFirstPhotoOfEachStyle.map((element, idx) => {
                  if (idx < 4) {
                    return <img onClick={updateCurrentStyle} className='eachStyleSelection' key={idx} id={`style${idx}`} src={element}></img>;
                  }
                })}
              </div>
              <div id='styleBottom'>
                {theFirstPhotoOfEachStyle.map((element, idx) => {
                  if (idx > 3) {
                    return <img onClick={updateCurrentStyle} className='eachStyleSelection' key={idx} id={`style${idx}`} src={element}></img>;
                  }
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default StyleSelector;
