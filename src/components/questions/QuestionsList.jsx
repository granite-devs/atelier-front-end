import React from 'react';
import Question from './Question.jsx';

const QuestionsList = (props) => {

  const filteredQuestions = props.questions.filter((question) => question.isVisible)

  return filteredQuestions.map((question) => {
    return (
      <Question
      key={question.question_id}
      question={question}
      handleYesClick={props.handleYesClick}/>
    )
  })
};

export default QuestionsList;