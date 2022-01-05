import React from 'react';
import Question from './Question.jsx';

const QuestionsList = (props) => {

  const { votedQuestions } = props; //
  const searchedQuestions = props.questions.filter((question) => question.isVisible)
  const filteredQuestions = searchedQuestions.map((question) => {
    (votedQuestions[question.question_id]) ? (question.wasVoted = true) : (question.wasVoted = false);
    return question;
  })

  return (
    <div id='questions-list-component'>
      {
        filteredQuestions.map((question) => {
          return (
            <Question
              key={question.question_id}
              question={question}
              handleYesQuestionClick={props.handleYesQuestionClick}
              wasVoted={question.wasVoted}
            />
          )
        })
      }
    </div>
  )

};

export default QuestionsList;