import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, shallow, render } from 'enzyme';
import QuestionsAnswers from '../src/components/questions/QuestionsAnswers.jsx';
import SearchBar from '../src/components/questions/QuestionsAnswers.jsx';

configure({ adapter: new Adapter() });

const productId = 39333;

const questionAnswersComponent = shallow(<QuestionsAnswers key={`${productId}-3`} productId={productId} />);
const questionAnswersInstance = questionAnswersComponent.instance();
const searchBarComponent = shallow(<SearchBar filterQuestionsList={QuestionAnswers.filterQuestionsList} />);
const searchBarInstance = searchBarComponent.instance();

// Parent component
test('Renders a class QuestionsAnswers component', () => {
  expect(questionAnswersInstance).toBeInstanceOf(QuestionsAnswers);
})

test('Should have a search bar', ()=> {
  expect(questionAnswersComponent.find(SearchBar)).toBeDefined();
});
//TODO
test.todo('Should have questions list component');

test('should have an load more questions button', () => {
  expect(questionAnswersComponent.find('#load-question-button').exists()).toBe(true)
})

test('should have an add a questions button', () => {
  expect(questionAnswersComponent.find('#add-question-button').exists()).toBe(true)
})

test.todo('Should have a link to load more questions')

//search bar
test.todo('Should have an input with placeholder text');
test.todo('Should filter questions list')
test.todo('Should filter results after three characters')
test.todo('filterQuestionsList should filter by the input search term')

//questionsListComp
test.todo('should have an add answer button')
