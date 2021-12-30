import React from 'react';
import AnswerList from './AnswerList.jsx';

class Question extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      answerList: []
    }
  }

  componentDidMount() {
    this.setState({ answerList: this.props.question.answers })
  }

  render() {
    const question = this.props.question;
    return (
      <div className="question-container">
        <div className="question-body">
          <span className="heavy"> Q: {question.question_body}</span>
          <div className="help-container">
            <a className="td-none"> Helpful? </a>
            <a> Yes {question.question_helpfulness}</a>
            <span>|</span>
            <a> Add Answer</a>
          </div>

        </div>

        <AnswerList answers={this.state.answerList} />
      </div>
    )
  }
};

export default Question;