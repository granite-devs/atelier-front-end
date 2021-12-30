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
  }


  //TODO: add filter search
  filterQuestionsList(term) {

    const filteredList = this.state.questionsList.filter((question) => {
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

    if (term.length >= 3) {
      this.setState({ questionsList: filteredList})
    }
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
          const MappedQuestions = res.data.results.map((question, idx) => {
            if (idx < 2) {
              question.isVisible = true;
              return question;
            } else {
              question.isVisible = false;
              return question;
            }
          })

          this.setState({
            questionsList: MappedQuestions
          })
        })

        .catch((error) => {
          console.error(error);
        });
    }
  }


  render() {
    return (
      <div className="question-answers-container">
        <SearchBar filterQuestionsList={this.filterQuestionsList} />
        {/* TO DO: Add QuestionsList */}
        <QuestionsList questions={this.state.questionsList} />
        {/* TO DO: Load More Questions/Add Querstios */}
        <div className="button-container">
          <button id="load-question-button" type="button"> MORE QUESTIONS </button>
          <button id="add-question-button" type="button"> ADD QUESTION </button>
        </div>
      </div>
    );
  }
}

export default QuestionsAnswers;
