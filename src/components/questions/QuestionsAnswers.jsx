import React from 'react';
import axios from 'axios';
import SearchBar from './SearchBar.jsx';
import API_KEY from '../../config';

class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsList: [],
    }
    this.filterQuestionsList = this.filterQuestionsList.bind(this);
  }


  filterQuestionsList(term) {
    let filteredResults = this.state.questionsList.filter((question)=> {
      const questionBody = question.question_body.toLowerCase();
      const search = term.toLowerCase();
      if (questionBody.includes(search)) {
        question.isVisible = true;
        return question;
      } else {
        question.isVisible =false;
        return question;
      }
    })
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
          //set all but two to visible
          const MappedQuestions = res.data.results.map((question, idx) => {
            if (idx < 3) {
              question.isVisible = true;
              return question;
            } else {
              question.isVisible = false;
              return question;
            }
          })

          this.setState({
            questionsList: res.data.results
          })
        })

        .catch((error) => {
          console.error(error);
        });
    }
  }


  render() {
    return (
      <>
        <h3>Questions & Answers</h3>
        <SearchBar filterQuestionsList={this.filterQuestionsList}/>
        {/* TO DO: Add QuestionsList */}
        {/* TO DO: Load More Questions/Add Querstios */}
        <button id="load-question-button" type="button"> MORE ANSWERED QUESTIONS </button>
        <button id="add-question-button" type="button"> ADD A QUESTION + </button>
      </>
    );
  }
}

export default QuestionsAnswers;
