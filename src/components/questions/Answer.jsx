import React from 'react';
import timeAgo from "../../utils/timeAgo.js";


const Answer = ({ answer, voteHelpfulAnswer }) => {

  const {
    body,
    answerer_name,
    answer_id, date,
    photos,
    helpfulness
  } = answer;

  return (
    <li>
      <span>{body}</span>
      <div className="help-container">
        <span>
          {
            (answerer_name === 'Seller') ?
              (<strong>by: {answerer_name}</strong>)
              :
              (<>by: {answerer_name}</>)
          }
        </span>
        <span>{timeAgo(date)}</span>
        <span> | </span>
        <span> Helpful ? </span>
        {
          (window.localStorage.getItem(`${answer_id}`)) ? (
            <button
              id={`vote-helpful-answer-${answer_id}`}
              disabled
            > Yes {helpfulness}
            </button>
          )
            :
            (
              <button
                id={`vote-helpful-answer-${answer_id}`}
                onClick={() => {
                  voteHelpfulAnswer(answer_id)
                }}> Yes {helpfulness}
              </button>
            )

        }
        <span> | </span>
        <a> Report </a>
      </div>
      <div className="photo-container">
        {
          (photos) && (
            photos.map((photo) => {
              return <img key={photo.id} src={photo.url} />;
            })
          )
        }
      </div>
    </li>
  );
}

export default Answer;