import React from 'react';
import timeAgo from "../../utils/timeAgo.js";


const Answer = ({ answer, voteHelpfulAnswer }) => {
  return (
    <li>
      <span>{answer.body}</span>
      <div className="help-container">
        <span>
          {
            (answer.answerer_name === 'Seller') ?
              (<strong>by: {answer.answerer_name}</strong>)
              :
              (<>by: {answer.answerer_name}</>)
          }
        </span>
        <span>{timeAgo(answer.date)}</span>
        <span> | </span>
        <span> Helpful ?
          <button
          id={`vote-helpful-answer-${answer.answer_id}`}
          onClick={() => {
            voteHelpfulAnswer(answer.answer_id)
          }}> Yes {answer.helpfulness}
          </button>
        </span>
        <span> | </span>
        <button
        id={`report-${answer.answer_id}`}
        className='report-btn'
        onClick={() => {
          const button = document.querySelector(`#report-${answer.answer_id}`);
          button.disabled = true;
          button.innerHTML = 'Reported';
        }}> Report </button>
      </div>
      <div className="photo-container">
        {
          (answer.photos) && (
            answer.photos.map((photo) => {
              return <img key={photo.id} src={photo.url} />;
            })
          )
        }
      </div>
    </li>
  );
}

export default Answer;