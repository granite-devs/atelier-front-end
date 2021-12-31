import React, { useState, useEffect } from 'react';

const StyleSelector = ({state, updateState}) => {
  const [ selectedStyleName, updateSelectedStyleName ] = useState('');
  const [ theFirstPhotoOfEachStyle, updateDefaultPhoto ] = useState([]);

  useEffect (() => {
    let defaultStylePhotoArray = [];
    if (state.selectedProductStyle[0] !== undefined) {
      state.selectedProductStyle.forEach ((eachStyle) => {
        defaultStylePhotoArray.push(eachStyle.photos[0].url);
      });
      updateDefaultPhoto(defaultStylePhotoArray);
    }
  }, [state]);

  return (
    <>
      {theFirstPhotoOfEachStyle[0] !== undefined && (
        <div id='styleSelector'>
          <div id='styleTitle'>
            STYLE : {state.selectedProductDefaultStyle.name}
          </div>
          <div id='styleSelection'>
            {theFirstPhotoOfEachStyle.map((element, idx) => {
              return <img className='eachStyleSelection' key={idx} id={`style${idx}`} src={element}></img>;
            })}
          </div>
        </div>
      )}

    </>
  );
};

export default StyleSelector;
