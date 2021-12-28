import React from 'react';

class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productId: null
    }
  }

  componentDidMount() {
    const { productId } = this.props;
    this.setState({productId: productId})
  }

  render() {
    return (
      <>
        <h3>
          Questions & Answers
        </h3>
        {/* TO DO: Add Search Bar */}
        {/* TO DO: Add QuestionsList */}
        {/* TO DO: Load More Questions/Add Querstios */}
        <button type="button"> MORE ANSWERED QUESTIONS </button>
        <button type="button"> ADD A QUESTION + </button>
      </>
    );
  }
}

export default QuestionsAnswers;
