import React from 'react';
import axios from 'axios';
import AnswerList from './AnswerList.jsx';
import AddAnswerModal from './modals/AddAnswerModal.jsx';
import API_KEY from '../../config';

class Question extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      answersList: []
    }
    this.setTwoAnswersVisible = this.setTwoAnswersVisible.bind(this);
    this.loadMoreAnswers = this.loadMoreAnswers.bind(this);
    this.voteHelpfulAnswer = this.voteHelpfulAnswer.bind(this);
    this.toggleAddAnswerModal = this.toggleAddAnswerModal.bind(this);
    this.addAnswerToList = this.addAnswerToList.bind(this);
  }

  addAnswerToList(answer) {

    const { answersList } = this.state;
    const lastAnswer = answersList[answersList.length - 1];

    let nextId;

    (lastAnswer) ?
      (nextId = lastAnswer.answer_id + 1)
      :
      (nextId = 1);

    answer.answer_id = nextId;
    answer.isVisible = true;
    answer.helpfulness = 1;

    this.setState({
      answersList: [...answersList, answer],
      questionView: 'main'
    })

  }

  toggleAddAnswerModal(viewChange) {

    const { answersList } = this.state;

    this.setState({
      answersList: [...answersList],
      questionView: viewChange
    })

  }

  voteHelpfulAnswer(targetId) {

    const button = document.querySelector(`#vote-helpful-answer-${targetId}`)
    if (!button.disable) {
      const { answersList } = this.state;
      const alteredAnswerList = answersList.forEach((answer) => {
        if (answer.answer_id === targetId) {
          answer.helpfulness += 1
        }
      })
      button.disabled = true;
      this.setState({ answerList: alteredAnswerList })
    }
  }

  loadMoreAnswers() {

    const button = document.querySelector('#see-more-answers-btn');
    const answersList = this.state.answersList

    if (button.innerHTML.includes('LOAD MORE')) {
      const allAnswersVisible = answersList.map((answer) => {
        answer.isVisible = true;
        return answer;
      })
      button.innerHTML = 'SEE LESS ANSWERS'
      this.setState({ answerList: allAnswersVisible })
    } else {
      const twoVisibleAnwers = this.setTwoAnswersVisible(answersList)
      button.innerHTML = 'LOAD MORE ANSWERS'
      this.setState({ answerList: twoVisibleAnwers })
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

    const questionId = this.props.question.question_id;

    var config = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/qa/questions/${questionId}/answers`,
      headers: {
        'Authorization': API_KEY
      }
    };

    axios(config)
      .then((res) => {
        const displayAnswers = this.setTwoAnswersVisible(res.data.results)
        this.setState({
          answersList: displayAnswers
        })
      })
      .catch((error) => {
        console.log(error);
      });

  }

  render() {

    const question = this.props.question;

    const questionComponent = (
      <div className='question-container'>
        <div className='question-body'>
          <span className='heavy'> Q: {question.question_body}</span>
          <div className='help-container'>
            <span> Helpful? </span>
            <button
              id={`vote-helpful-question-${question.question_id}`}
              onClick={() => {
                this.props.handleYesQuestionClick(this.props.question)
              }}> Yes {question.question_helpfulness}
            </button>
            <span>|</span>
            <a
              onClick={() => {
                this.toggleAddAnswerModal('AddAnswerModal')
              }}> Add Answer </a>
          </div>
        </div>
        <div className='answer-list-container'>
          <AnswerList
            answers={this.state.answersList}
            loadMoreAnswers={this.loadMoreAnswers}
            voteHelpfulAnswer={this.voteHelpfulAnswer}
          />

        </div>
      </div>
    )

    switch (this.state.questionView) {

      case 'AddAnswerModal':
        return (
          <>
            <AddAnswerModal
              toggleAddAnswerModal={this.toggleAddAnswerModal}
              addAnswerToList={this.addAnswerToList}
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