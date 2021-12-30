import React from 'react';
import Question from './Question.jsx';

const QuestionsList = ({ questions }) => {

  const filteredQuestions = questions.filter((question) => question.isVisible)

  return filteredQuestions.map((question) => {
    return (
      <Question key={question.question_id} question={question} />
    )
  })
};

export default QuestionsList;