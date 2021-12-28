import React from 'react';
import renderer from 'react-test-renderer';
import QuestionsAnswers from '../src/components/questions/QuestionsAnswers.jsx';


test('Renders questions and answers with an h3 header', () => {

  const questionsAnswersComp = renderer.create(<QuestionsAnswers />);
  const questionTree = questionsAnswersComp.toJSON()
  expect(questionTree).toMatchSnapshot()

})