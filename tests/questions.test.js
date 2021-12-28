import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React from 'react';
import { shallow, render } from 'enzyme';
import QuestionsAnswers from '../src/components/questions/QuestionsAnswers.jsx';

//add adapter
configure({ adapter: new Adapter() });

it('Renders questions and answers with an h3 header', () => {

  const questionsAnswersComp = shallow(<QuestionsAnswers />)

  expect(questionsAnswersComp.find('<QuestionsAnswers />')).to.have.lengthOf(2)

})