import React from 'react';
import axios from 'axios';
import AnswersList from './AnswersList.jsx';
import AddAnswerModal from './modals/AddAnswerModal.jsx';
import { getAnswers, postAnswer, putHelpfulAnswer } from "../../utils/questionsUtils.js";


class Question extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      answersList: [],
    }
    this.setTwoAnswersVisible = this.setTwoAnswersVisible.bind(this);
    this.loadMoreAnswers = this.loadMoreAnswers.bind(this);
    this.voteHelpfulAnswer = this.voteHelpfulAnswer.bind(this);
    this.toggleAddAnswerModal = this.toggleAddAnswerModal.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
  }

  addAnswer(answer) {

    answer.photos = [];
    const { question_id } = this.props.question;
    postAnswer(answer, question_id)
      .then((response) => {
        if (response.status === 201) {
          getAnswers(question_id)
            .then((response) => {
              const answersList = this.setTwoAnswersVisible(response)
              this.setState({ answersList, questionView: 'main' })
            })
            .catch((err) => {
              console.error(err)
            })
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  toggleAddAnswerModal(viewChange) {

    const { answersList } = this.state;

    this.setState({
      answersList: [...answersList],
      questionView: viewChange
    })

  }

  voteHelpfulAnswer(answerId) {

    const button = document.querySelector(`#vote-helpful-answer-${answerId}`)
    const { answersList } = this.state;
    const { question_id } = this.props.question;



    if (!button.disable) {
      putHelpfulAnswer(answerId)
        .then(() => {
          const alteredAnswers = answersList.map((answer) => {
            if (answer.answer_id === answerId) {
              answer.helpfulness += 1
            }
            return answer
          })
          this.setState({answersList : alteredAnswers})
        })
        .catch((error) => {
          console.error(error);
        })

      window.localStorage.setItem(`${answerId}`, true)
      button.disabled = true;
    }
  }

  loadMoreAnswers(questionId) {

    const button = document.querySelector('#see-more-answers-btn');

    const { answersList } = this.state

    if (button.innerHTML.includes('LOAD MORE')) {
      const allAnswersVisible = answersList.map((answer) => {
        answer.isVisible = true;
        return answer;
      })
      button.innerHTML = 'SEE LESS ANSWERS'
      this.setState({ answersList: allAnswersVisible })
    } else {
      const twoVisibleAnwers = this.setTwoAnswersVisible(answersList)
      button.innerHTML = 'LOAD MORE ANSWERS'
      this.setState({ answersList: twoVisibleAnwers })
    }
  }

  setTwoAnswersVisible(arrayOfAnswers) {
    const filteredAnswers = arrayOfAnswers.map((answer, idx) => {
      if (idx < 2) {
        answer.isVisible = true;
        return answer;
      } else {
        answer.isVisible = false;
        return answer;
      }
    })
    return filteredAnswers
  }

  componentDidMount() {

    const { question_id } = this.props.question;

    getAnswers(question_id)
      .then((response) => {
        const answersList = this.setTwoAnswersVisible(response)
        this.setState({
          answersList: answersList
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  render() {

    const { question, handleYesQuestionClick } = this.props;
    const { question_id } = question;

    const questionComponent = (
      <div className='question-container'>
        <div className='question-body'>
          <span className='heavy'> Q: {question.question_body}</span>
          <div className='help-container'>
            <span> Helpful? </span>
            {
              (window.localStorage.getItem(`${question_id}`)) ?
                (<button
                  id={`vote-helpful-question-${question.question_id}`}
                  disabled
                > Yes {question.question_helpfulness}
                </button>)
                :
                (<button
                  id={`vote-helpful-question-${question.question_id}`}
                  onClick={() => {
                    this.props.handleYesQuestionClick(this.props.question)
                  }}> Yes {question.question_helpfulness}
                </button>)
            }
            <span>|</span>
            <a
              onClick={() => {
                this.toggleAddAnswerModal('AddAnswerModal')
              }}> Add Answer </a>
          </div>
        </div>
        <div className='answer-list-container'>
          <AnswersList
            answers={this.state.answersList}
            loadMoreAnswers={this.loadMoreAnswers}
            voteHelpfulAnswer={this.voteHelpfulAnswer}
          />
        </div>
      </div >
    )

    switch (this.state.questionView) {

      case 'AddAnswerModal':
        return (
          <>
            <AddAnswerModal
              toggleAddAnswerModal={this.toggleAddAnswerModal}
              addAnswer={this.addAnswer}
            />
          </>
        )

      default:
        return (
          <>
            {questionComponent}
          </>
        )
    }
  }
};

export default Question;