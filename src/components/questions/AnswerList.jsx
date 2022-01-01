import React from "react";
import Answer from "./Answer.jsx"

const AnswerList = ({ answers, loadMoreAnswers }) => {

  const arrayOfVisibleAnswers = answers.filter(answer => answer.isVisible ? answer : null)

  return (
    <div className="answer-item">
      {
        arrayOfVisibleAnswers.map((answer) => {
          return (<Answer key={answer.answer_id} answer={answer} />)
        })
      }
      <br></br>
      {
        (answers.length > 2)?
          (<a
            id="see-more-answers-btn"
            onClick={()=>{
              loadMoreAnswers()
            }}
            > LOAD MORE ANSWERS </a>)
          :null
      }
    </div>
  );
};

export default AnswerList;
