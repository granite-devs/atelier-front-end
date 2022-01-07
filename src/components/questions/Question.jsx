import React from 'react';
import axios from 'axios';
import AnswersList from './AnswersList.jsx';
import AddAnswerModal from './modals/AddAnswerModal.jsx';
import ImageModal from '../shared/ImageModal.jsx'
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
    this.toggleAnswerView = this.toggleAnswerView.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
  }

  addAnswer(answer) {

    const { question_id } = this.props.question;
    answer.photos = [];

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

  toggleAnswerView(viewChange, image) {

    const { answersList } = this.state;

    this.setState({
      answersList: [...answersList],
      questionView: viewChange,
      image: image
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

    const button = document.querySelector(`#see-answers-${questionId}`);
    const { answersList } = this.state

    if (button.innerHTML.includes('Load More')) {
      const allAnswersVisible = answersList.map((answer) => {
        answer.isVisible = true;
        return answer;
      })
      button.innerHTML = 'See Less Answers'
      this.setState({ answersList: allAnswersVisible })
    } else {
      const twoVisibleAnwers = this.setTwoAnswersVisible(answersList)
      button.innerHTML = 'Load More Answers'
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
          answersList: answersList,
          view: null,
          image: null,
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  render() {


    const { answersList, questionView, image } = this.state;
    const { question, handleYesQuestionClick } = this.props;

    const {
      question_id,
      question_body,
      question_helpfulness
    } = question;

    const {
      loadMoreAnswers,
      voteHelpfulAnswer,
      toggleAnswerView,
      addAnswer } = this;

    const questionComponent = (
      <div className='question-container'>
        <div className='question-body'>
          <span className='heavy'> Q: { question_body }</span>
          <div className='help-container'>
            <span> Helpful? </span>
            {
              (window.localStorage.getItem(`${ question_id }`)) ?
                (<button
                  id={`vote-helpful-question-${ question_id }`}
                  disabled>
                 Yes { question_helpfulness }
                </button>)
                :
                (<button
                  id={`vote-helpful-question-${ question_id }`}
                  onClick={() => {
                    handleYesQuestionClick(question)
                  }}> Yes { question_helpfulness }
                </button>)
            }
            <a
              onClick={() => {
                toggleAnswerView('AddAnswerModal')
              }}> Add Answer </a>
          </div>
        </div>
        <div className='answer-list-container'>
          <AnswersList
            questionId={question_id}
            answers={answersList}
            loadMoreAnswers={loadMoreAnswers}
            voteHelpfulAnswer={voteHelpfulAnswer}
            toggleAnswerView={toggleAnswerView}
          />
        </div>
      </div >
    )

    switch (questionView) {

      case 'viewPhotoModal':
        return (
          <>
            <ImageModal
            closeFn={toggleAnswerView}
            image={image}
             />
            { questionComponent }
          </>
        )

      case 'AddAnswerModal':
        return (
          <>
            <AddAnswerModal
              toggleAnswerView={ toggleAnswerView }
              addAnswer={ addAnswer }
            />
            { questionComponent }
          </>
        )

      default:
        return (
          <>
            { questionComponent }
          </>
        )
    }
  }
};

export default Question;