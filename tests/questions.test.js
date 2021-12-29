import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, shallow, render } from 'enzyme';
import initialState from './questionTestData.js'
import QuestionsAnswers from '../src/components/questions/QuestionsAnswers.jsx';
import SearchBar from '../src/components/questions/SearchBar.jsx';

configure({ adapter: new Adapter() });

describe('Question and answers component', () => {

  //Set global component variables
  const productId = 39333;
  const questionsAnswersShallow = shallow(<QuestionsAnswers key={`${productId}-3`} productId={productId} />);
  const questionsAnswersInstance = questionsAnswersShallow.instance();

  const searchBarShallow = shallow(<SearchBar filterQuestionsList={QuestionsAnswers.filterQuestionsList} />);
  const searchBarInstance = searchBarShallow.instance();

  test('questionsAnswersInstance is a class of QuestionsAnswers', () => {
    expect(questionsAnswersInstance).toBeInstanceOf(QuestionsAnswers);
  })

  test('questionAnswers setState should match our initial state ', () => {
    questionsAnswersShallow.setState(initialState)
    expect(questionsAnswersShallow.state()).toEqual(initialState);
  })

  test('questionsAnswersShallow should have a search bar', () => {
    expect(questionsAnswersShallow.exists('SearchBar')).toBe(true);
  });

  test('questionsAnswersShallow\'s state should each have isVisible property', () => {
    const doesEveryQuestionHaveIsVisible = questionsAnswersShallow.state('questionsList').every((question) => {
      return (question.isVisible !== undefined) ? true : false;
    })
    expect(doesEveryQuestionHaveIsVisible).toBe(true);
  })

  //Filter questions method
  test('filterQuestionsList should not change isVisible if less than two characters are typed', () => {
    questionsAnswersShallow.filterQuestionsList = questionsAnswersInstance.filterQuestionsList;
    questionsAnswersShallow.filterQuestionsList('ho');
    expect(questionsAnswersShallow.state()).toMatchObject(initialState);
  });

  test('filterQuestionsList should set only one question to visible with search term "How"', () => {
    let howManyAreVisible = [];
    questionsAnswersShallow.filterQuestionsList = questionsAnswersInstance.filterQuestionsList;
    questionsAnswersShallow.filterQuestionsList('how');
    questionsAnswersShallow.state('questionsList').forEach((question) => {
      return (question.isVisible === true) ? howManyAreVisible.push(question) : undefined;
    })
    expect(howManyAreVisible.length).toBe(1);
  });

  //TODO
  test.todo('Should have questions list component');

  test('questionsAnswersShallow should have an load more questions button', () => {
    expect(questionsAnswersShallow.exists('#load-question-button')).toBe(true);
  })

  test('questionsAnswersShallow should have an add a questions button', () => {
    expect(questionsAnswersShallow.exists('#add-question-button')).toBe(true);
  })

  //search bar

  test('searchBarShallow should have an input with placeholder text', () => {
    expect(searchBarShallow.exists('#search-input')).toBe(true);
  });


  test.todo('filterQuestionsList should filter by the input search term');

  //questionsListCompg
  test.todo('should have an add answer button');
})
