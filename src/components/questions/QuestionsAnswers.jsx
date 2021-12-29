import React from 'react';
import axios from 'axios'
class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      questionsList: [],
      term: ''
    }
  }

  //TODO: add filter search

  componentDidMount() {

    const { productId } = this.props;

    let questionConfig = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/qa/questions?product_id=${productId}`,
      headers: {
        'Authorization': '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'
      }
    };

    if (productId) {
      axios(questionConfig)
        .then((res) => {
          this.setState({
            questionsList: res.data.results,
            term: ''
          })
        })
        .catch((error) => {
          console.error(error);
        })
    }
  }


  render() {
    return (
      <>
        <h3>Questions & Answers</h3>
        {/* TO DO: Add Search Bar */}
        <SearchBar />
        {/* TO DO: Add QuestionsList */}
        {/* TO DO: Load More Questions/Add Querstios */}
        <button type="button"> MORE ANSWERED QUESTIONS </button>
        <button type="button"> ADD A QUESTION + </button>
      </>
    )
  }
}

export default QuestionsAnswers;
