import React from 'react';
import timeAgo from '../../utils/timeAgo.js'


const AnswerList = (props) => {

  return (
    <div className="answer-item">
      {props.answers.map((answer) => {
        return (
          <li key={answer.answer_id}>
            <span>{answer.body}</span>
            <div className="help-container">
              <span>by: {answer.answerer_name}</span>
              <span>{timeAgo(answer.date)}</span>
              <span> | </span>
              <span> Helpful? <a> Yes{answer.answer_helpfulness}</a> </span>
              <span> | </span>
              <a> Report </a>
            </div>
            <div className="photo-container">
              {
                (answer.photos) ? (answer.photos.map((photo) => {
                  return (<img key={photo.id} src={photo.url} />)
                })) : null
              }
            </div>
          </li>)
      })}
    </div>
  )
}

export default AnswerList