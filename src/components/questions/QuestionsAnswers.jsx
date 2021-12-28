import React from 'react';
import SearchBar from './SearchBar.jsx';

class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productId: null,
      questionsList: []
    }
  }

  //TODO: add filter search

  componentDidMount() {
    const { productId } = this.props;
    this.setState({
      productId: productId,
      questionsList: []
    })
  }

  render() {
    return (
      <>
        <h3>
          Questions & Answers
        </h3>
        {/* TO DO: Add Search Bar */}
        <SearchBar />
        {/* TO DO: Add QuestionsList */}
        {/* TO DO: Load More Questions/Add Querstios */}
      </>
    );
  }
}

export default QuestionsAnswers;
