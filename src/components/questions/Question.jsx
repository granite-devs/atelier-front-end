import React from 'react';
import axios from 'axios';
import AnswerList from './AnswerList.jsx';
import API_KEY from '../../config';

class Question extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      answersList: []
    }
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
        this.setState({ answersList: res.data.results })
      })
      .catch((error) => {
        console.log(error);
      });

  }

  render() {
    const question = this.props.question;
    return (
      <div className="question-container">
        <div className="question-body">
          <span className="heavy"> Q: { question.question_body }</span>
          <div className="help-container">
            <a className="td-none"> Helpful? </a>
            <a onClick={() => {
              this.props.handleYesClick(this.props.question)
            }}> Yes { question.question_helpfulness }</a>
            <span>|</span>
            <a> Add Answer</a>
          </div>
        </div>
        <div className="answer-list-container">
          {
            (Object.values(question.answers).length)?
            (<><span>A:</span><AnswerList answers={ this.state.answersList } /></>):
            null
          }
        </div>
      </div>
    )
  }
};

export default Question;