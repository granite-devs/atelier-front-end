import React from 'react';
import AnswerList from './AnswerList.jsx';

class Question extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      question: null
    }
  }

  componentDidMount() {
    this.setState({ question: this.props.question })
  }

  render() {
    const question = this.props.question;
    return (
      <div className="question-container">
        <div className="question-body">
          <span className="heavy"> Q: {question.question_body}</span>
          <div className="help-container">
            <a className="td-none"> Helpful? </a>
            <a onClick={() => {
              this.props.handleYesClick(this.props.question)
            }}> Yes {question.question_helpfulness}</a>
            <span>|</span>
            <a> Add Answer</a>
          </div>
        </div>
        <AnswerList answers={this.props.question.answers} />
      </div>
    )
  }
};

export default Question;