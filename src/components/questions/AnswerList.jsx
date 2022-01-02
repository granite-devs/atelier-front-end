import React from "react";
import Answer from "./Answer.jsx"

const AnswerList = ({ answers, loadMoreAnswers, voteHelpfulAnswer }) => {

  const arrayOfVisibleAnswers = answers.filter(answer => answer.isVisible ? answer : null)

  return (
    <div className="answer-item">
      {
        arrayOfVisibleAnswers.map((answer) => {
          return (
            <div className='answer-label' key={answer.answer_id}>
              <strong>A:</strong>
              <Answer
                key={answer.answer_id}
                answer={answer}
                voteHelpfulAnswer={voteHelpfulAnswer}
              />
            </div>
          )
        })
      }
      <br></br>
      {
        (answers.length > 2) && (
          <a
            id="see-more-answers-btn"
            onClick={() => {
              loadMoreAnswers()
            }}
          > LOAD MORE ANSWERS </a>
        )
      }
    </div>
  );
};

export default AnswerList;
