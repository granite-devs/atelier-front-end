import React from 'react';
import SearchBar from './SearchBar.jsx';
import axios from 'axios';
import API_KEY from '../../config.js';

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

    //TODO: make an axios request

    this.setState({
      productId: productId,
      questionsList: [],
      searchTerm: ''
    })
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
    );
  }
}

export default QuestionsAnswers;
