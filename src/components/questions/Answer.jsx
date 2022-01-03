import React from 'react';
import timeAgo from "../../utils/timeAgo.js";


const Answer = ({ answer }) => {
  return (
    <li>
      <span>{ answer.body }</span>
      <div className="help-container">
        <span>
          {
            (answer.answerer_name === 'Seller')?
              (<strong>by: { answer.answerer_name }</strong>)
              :(<>by: { answer.answerer_name }</>)
          }
        </span>
        <span>{ timeAgo(answer.date) }</span>
        <span> | </span>
        <span> Helpful ? <a> Yes { answer.helpfulness } </a> </span>
        <span> | </span>
        <a> Report </a>
      </div>
      <div className="photo-container">
        {
          (answer.photos)?
          (answer.photos.map((photo) => {
              return <img key={ photo.id } src={ photo.url } />;
          }))
          :null
        }
      </div>
    </li>
  );
}

export default Answer;