import React from 'react';
import axios from 'axios';
import SearchBar from './SearchBar.jsx';
import QuestionsList from './QuestionsList.jsx'
import API_KEY from '../../config';

class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsList: [],
    }
    this.filterQuestionsList = this.filterQuestionsList.bind(this);
    this.addHelpfulVote = this.addHelpfulVote.bind(this);
    this.loadMoreQuestions = this.loadMoreQuestions.bind(this);
    this.setTwoQuestionsVisable = this.setTwoQuestionsVisable.bind(this);
  }

  filterQuestionsList(term) {
    if (term.length >= 3) {
      const filteredList = this.state.questionsList.map((question) => {
        const questionBody = question.question_body.toLowerCase();
        const search = term.toLowerCase();
        if (questionBody.includes(search)) {
          question.isVisible = true;
          return question;
        } else {
          question.isVisible = false;
          return question;
        }
      })
      this.setState({ questionsList: filteredList })
    } else {
      const unfilteredList = this.setTwoQuestionsVisable(this.state.questionsList)
      this.setState({ questionsList: unfilteredList })
    }
  }

  addHelpfulVote(questionToUpdate) {
    const newState = this.state.questionsList;

    newState.forEach((question) => {
      if (questionToUpdate.question_id === question.question_id) {
        questionToUpdate.question_helpfulness += 1;
      }
    })

    this.setState({questionsList: newState})
  }

  loadMoreQuestions(e) {

    const button = document.querySelector('#load-question-button')

    if (button.innerHTML.includes('MORE QUESTIONS')) {
      button.innerHTML = 'LESS QUESTIONS'
      const entireQuestionList = this.state.questionsList.map((question) => {
        question.isVisible = true;
        return question;
      })
      this.setState({ questionsList: entireQuestionList })
    } else {
      button.innerHTML = 'MORE QUESTIONS'
      const unfilteredList = this.setTwoQuestionsVisable(this.state.questionsList);
      this.setState({ questionsList: unfilteredList })
    }
  }

  setTwoQuestionsVisable(array) {
    const twoSetVisable = array.map((question, idx) => {
      if (idx < 2) {
        question.isVisible = true;
        return question;
      } else {
        question.isVisible = false;
        return question;
      }
    })
    return twoSetVisable;
  }

  componentDidMount() {

    const { productId } = this.props;
    let questionConfig = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/qa/questions?product_id=${productId}`,
      headers: {
        Authorization: API_KEY
      }
    };

    if (productId) {
      axios(questionConfig)
        .then((res) => {
          const mappedQuestions = this.setTwoQuestionsVisable(res.data.results);
          this.setState({ questionsList: mappedQuestions })
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }


  render() {
    return (
      <div className="question-answers-container">
        <SearchBar filterQuestionsList={ this.filterQuestionsList } />
        <QuestionsList
          questions={ this.state.questionsList }
          handleYesClick={ this.addHelpfulVote } />
        <div className="button-container">
          {
            (this.state.questionsList.length > 2) ?
              (<button
                id="load-question-button"
                type="button"
                onClick={ (e) => {
                  this.loadMoreQuestions(e);
                } }
              > MORE QUESTIONS </button>) : null
          }
          <button
            id="add-question-button"
            type="button"> ADD QUESTION </button>
        </div>
      </div>
    );
  }
}

export default QuestionsAnswers;
