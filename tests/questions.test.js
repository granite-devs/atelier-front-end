import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, shallow } from 'enzyme';
import QuestionsAnswers from '../src/components/questions/QuestionsAnswers.jsx';
import SearchBar from '../src/components/questions/QuestionsAnswers.jsx';

configure({ adapter: new Adapter() });

const productId = 39333;

const questionsAnswersShallow = shallow(<QuestionsAnswers key={`${productId}-3`} productId={productId} />);
const questionsAnswersInstance = questionsAnswersShallow.instance();

const searchBarShallow = shallow(<SearchBar filterQuestionsList={QuestionsAnswers.filterQuestionsList} />);
const searchBarInstance = searchBarShallow.instance();

const initialState = {
  "questionsList": [
    "{answers: {…}, asker_name: \"cleopatra\", isVisible: …}",
    "{answers: {…}, asker_name: \"jbilas\", isVisible: tru…}",
    "{answers: {…}, asker_name: \"funnygirl\", isVisible: …}",
    "{answers: {…}, asker_name: \"yankeelover\", isVisible…}"
  ]
}

// Parent component
test('questionAnswersComponent is a class of QuestionsAnswers', () => {
  expect(questionsAnswersInstance).toBeInstanceOf(QuestionsAnswers);
})

// test('QuestionAnsers should have a matching initial state to our data ', () => {

// })

test('QuestionAnswers should have a search bar', ()=> {
  expect(questionsAnswersShallow.contains(<SearchBar />)).toBe(true);
});
//TODO
test.todo('Should have questions list component');

test('should have an load more questions button', () => {
  expect(questionsAnswersShallow.find('#load-question-button').exists()).toBe(true);
})

test('should have an add a questions button', () => {
  expect(questionsAnswersShallow.find('#add-question-button').exists()).toBe(true);
})

//search bar
test('Should have an input with placeholder text', () => {
  expect(searchBarShallow.find('#search-input').exists()).toBe(true);
});

test.todo('Should filter questions list')
test.todo('Should filter results after three characters')
test.todo('filterQuestionsList should filter by the input search term')

//questionsListCompg
test.todo('should have an add answer button')
