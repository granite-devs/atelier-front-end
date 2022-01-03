import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, shallow, render } from 'enzyme';
import initialState from './questionTestData.js'
import QuestionsAnswers from '../src/components/questions/QuestionsAnswers.jsx';
import SearchBar from '../src/components/questions/SearchBar.jsx';
import QuestionsList from '../src/components/questions/QuestionsList.jsx';
import Question from '../src/components/questions/Question.jsx';
import AnswerList from '../src/components/questions/AnswerList.jsx';
import Answer from '../src/components/questions/Answer.jsx';
import AddQuestionModal from  '../src/components/questions/modals/AddQuestionModal.jsx';
import AddAnswerModal from '../src/components/questions/modals/AddAnswerModal.jsx';





configure({ adapter: new Adapter() });

describe('Question and answers component', () => {

  //Set global component variables
  const productId = 39333;
  const questionsAnswersShallow = shallow(<QuestionsAnswers key={`${productId}-3`} productId={productId} />);
  const questionsAnswersInstance = questionsAnswersShallow.instance();

  const searchBarShallow = shallow(<SearchBar filterQuestionsList={QuestionsAnswers.filterQuestionsList} />);
  const searchBarInstance = searchBarShallow.instance();

  //Questions Answers component and methods
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

  test('Should have questions list component', ()=> {
    expect(questionsAnswersShallow.exists('#questions-list-component')).toBe(true);
  });

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



  //questionsListComp
  test.todo('Should have two question components');
  test.todo('should have "ADD QUESTOIN" button');
  test.todo(' "LOAD MORE QUESTIONS" should render all questions');

  //Question Comp
  test.todo('Should have a question body');
  test.todo('Should have helpful vote button');


  //AnswerList Comp

  //Answer
})
