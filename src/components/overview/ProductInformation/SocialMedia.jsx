import React, { useState, useEffect } from 'react';

const SocialMedia = ({state, updateState}) => {

  return (
    <>
      <div id='socialMedia'>
        <img id='eachSocialMedia' src='https://cdn-icons-png.flaticon.com/512/174/174855.png' style={{marginRight: '8px'}}></img>
        <img id='eachSocialMedia' src='https://cdn.cdnlogo.com/logos/t/96/twitter-icon.svg' style={{marginRight: '8px'}}></img>
        <img id='eachSocialMedia' src='https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Pinterest_colored_svg-1024.png'></img>
      </div>
    </>
  );
};

export default SocialMedia;