import React from 'react';
import axios from 'axios';
import SearchBar from './SearchBar.jsx';
import QuestionsList from './QuestionsList.jsx';
import AddQuestionModal from './modals/AddQuestionModal.jsx';
import AddAnswerModal from './modals/AddAnswerModal.jsx';
import API_KEY from '../../config';

class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsList: [],
      view: 'question-main'
    }
    this.filterQuestionsList = this.filterQuestionsList.bind(this);
    this.voteHelpfulQuestion = this.voteHelpfulQuestion.bind(this);
    this.loadMoreQuestions = this.loadMoreQuestions.bind(this);
    this.setTwoQuestionsVisable = this.setTwoQuestionsVisable.bind(this);
    this.setQuestionsView = this.setQuestionsView.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
  }

  addQuestion(question) {

    const { questionsList } = this.state;
    const lastQuestion = questionsList[questionsList.length - 1];
    const lastQuestionId = lastQuestion.question_id;
    const nextQuestionId = lastQuestionId + 1;

    question.question_id = nextQuestionId;

    const updatedQuestionsList = [...questionsList, question ]

    this.setState({
      questionsList: updatedQuestionsList,
      view: 'question-main'
    })
  }

  setQuestionsView(viewChange) {
    this.setState({
      questionsList: this.state.questionsList,
      view: viewChange
    })
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

  voteHelpfulQuestion(questionToUpdate) {

    const newState = this.state.questionsList;
    const button = document.querySelector(`#vote-helpful-question-${questionToUpdate.question_id}`);

    if (!button.disable) {
      newState.forEach((question) => {
        if (questionToUpdate.question_id === question.question_id) {
          questionToUpdate.question_helpfulness += 1;
        }
      })
      this.setState({ questionsList: newState })
      button.disabled = true;
    }
  }

  loadMoreQuestions( ) {

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
          this.setState({
            questionsList: mappedQuestions,
            view: 'question-main',
          })
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  render() {

    const QuestionsAnswersBody = (
      <div className="question-answers-container">
        <SearchBar filterQuestionsList={this.filterQuestionsList} />
        <QuestionsList
          questions={this.state.questionsList}
          handleYesQuestionClick={this.voteHelpfulQuestion}
        />
        <div className="button-container">
          {
            (this.state.questionsList.length > 2) && (
              <button
                id="load-question-button"
                type="button"
                className="big-btn"
                onClick={(e) => {
                  this.loadMoreQuestions(e);
                }}
              > MORE QUESTIONS </button>
            )
          }
          <button
            id="add-question-button"
            className="big-btn"
            type="button"
            onClick={() => {
              this.setQuestionsView('AddQuestionModal')
            }}> ADD QUESTION </button>
        </div>
      </div>
    );

    switch (this.state.view) {

      case 'AddQuestionModal':
        return (
          <>
            <AddQuestionModal
            productId={ this.props.productId }
            setQuestionsView={ this.setQuestionsView }
            addQuestion={ this.addQuestion }
            />
            {QuestionsAnswersBody}
          </>
        )

      case 'AddAnswerModal':
        return (
          <>
            <AddAnswerModal setQuestionsView={this.setQuestionsView} />
            {QuestionsAnswersBody}
          </>
        )

      default:
        return (
          <>
            {QuestionsAnswersBody}
          </>
        );
    }
  }
}

export default QuestionsAnswers;
