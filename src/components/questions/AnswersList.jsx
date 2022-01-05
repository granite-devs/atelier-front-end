import React from "react";
import Answer from "./Answer.jsx";

const AnswersList = ({ answers, loadMoreAnswers, voteHelpfulAnswer }) => {
  const arrayOfVisibleAnswers = answers.filter((answer) =>
    answer.isVisible ? answer : null
  );

  return (
    <div className="answer-item">
      <div className="answer-label">
        {
          (answers.length > 0) && (<strong>A:</strong>)
        }
        <div>
          {arrayOfVisibleAnswers.map((answer) => {
            return (
              <Answer
                key={answer.answer_id}
                answer={answer}
                voteHelpfulAnswer={voteHelpfulAnswer}
              />
            );
          })}
        </div>
      </div>
      <br></br>
      {answers.length > 2 && (
        <a
          id="see-more-answers-btn"
          onClick={() => {
            loadMoreAnswers();
          }}
        >
          LOAD MORE ANSWERS
        </a>
      )}
    </div>
  );
};

export default AnswersList;
