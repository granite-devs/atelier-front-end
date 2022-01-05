import React from "react";
import axios from "axios";
import SearchBar from "./SearchBar.jsx";
import QuestionsList from "./QuestionsList.jsx";
import AddQuestionModal from "./modals/AddQuestionModal.jsx";
import { getQuestions, postQuestion } from "../../utils/questionsUtils.js";

class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsList: [],
      votedQuestions: {}
    };
    this.filterQuestionsList = this.filterQuestionsList.bind(this);
    this.voteHelpfulQuestion = this.voteHelpfulQuestion.bind(this);
    this.loadMoreQuestions = this.loadMoreQuestions.bind(this);
    this.setTwoQuestionsVisable = this.setTwoQuestionsVisable.bind(this);
    this.toggleQuestionsModal = this.toggleQuestionsModal.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
  }

  addQuestion(question) {

    const { productId } = this.props;
    const { votedQuestions } = this.state;

    postQuestion(question, productId)
      .then((res) => {
        if (res.status === 201) {
          getQuestions(productId)
            .then((response) => {
              const mappedQuestions = this.setTwoQuestionsVisable(response);
              this.setState({
                questionsList: mappedQuestions,
                votedQuestions: votedQuestions,
                view: "main",
              });
            })
            .catch((err) => {
              console.error("Error getting questions after posting one!", err);
            });
        }
      })
      .catch((error) => {
        console.error("Error posting one question!", err);
      });
  }

  toggleQuestionsModal(viewChange) {
    this.setState({
      questionsList: this.state.questionsList,
      votedQuestions: this.state.votedQuestions,
      view: viewChange
    });
  }

  filterQuestionsList(term) {
    if (term.length >= 3) {
      const filteredList = this.state.questionsList.map((question) => {
        const questionBody = question.question_body.toLowerCase();
        const search = term.toLowerCase();
        if (questionBody.includes(search)) {
          question.isVisible = true;
          return question;
        } else {
          question.isVisible = false;
          return question;
        }
      });
      this.setState({ questionsList: filteredList });
    } else {
      const unfilteredList = this.setTwoQuestionsVisable(
        this.state.questionsList
      );
      this.setState({ questionsList: unfilteredList });
    }
  }

  voteHelpfulQuestion(questionToUpdate) {

    const storage = window.localStorage
    const { questionsList, votedQuestions } = this.state;
    const targetId = questionToUpdate.question_id;
    const button = document.querySelector(`#vote-helpful-question-${targetId}`);

    if (!button.disable) {
      questionsList.forEach((question) => {
        if (questionToUpdate.question_id === question.question_id) {
          questionToUpdate.question_helpfulness += 1;
        }
        votedQuestions[targetId] = true;
        storage[targetId] = true;
      });
      this.setState({
        questionsList: questionsList,
        votedQuestions: votedQuestions
      });
      button.disabled = true;
    }
  }

  loadMoreQuestions() {
    const button = document.querySelector('#load-question-button');

    if (button.innerHTML.includes('MORE QUESTIONS')) {
      button.innerHTML = 'LESS QUESTIONS';
      const entireQuestionList = this.state.questionsList.map((question) => {
        question.isVisible = true;
        return question;
      });
      this.setState({ questionsList: entireQuestionList });
    } else {
      button.innerHTML = 'MORE QUESTIONS';
      const unfilteredList = this.setTwoQuestionsVisable(
        this.state.questionsList
      );
      this.setState({ questionsList: unfilteredList });
    }
  }

  setTwoQuestionsVisable(array) {
    const twoSetVisable = array.map((question, idx) => {
      if (idx < 2) {
        question.isVisible = true;
        return question;
      } else {
        question.isVisible = false;
        return question;
      }
    });
    return twoSetVisable;
  }

  componentDidMount() {
    const { productId } = this.props;

    if (productId) {
      getQuestions(productId).then((response) => {
        const mappedQuestions = this.setTwoQuestionsVisable(response);
        this.setState({
          questionsList: mappedQuestions,
          view: "main",
        });
      });
    }
  }

  render() {

    const { questionsList, votedQuestions, view } = this.state;
    const QuestionsAnswersComponent = (
      <div className="question-answers-container">
        <SearchBar filterQuestionsList={this.filterQuestionsList} />
        <QuestionsList
          questions={questionsList}
          votedQuestions={votedQuestions}
          handleYesQuestionClick={this.voteHelpfulQuestion}
          changeView={this.changeView}
        />
        <div className="button-container">
          {
            questionsList.length > 2 && (
              <button
                id="load-question-button"
                type="button"
                className="big-btn"
                onClick={(e) => {
                  this.loadMoreQuestions();
                }}
              >
                MORE QUESTIONS
              </button>
            )
          }
          <button
            id="add-question-button"
            className="big-btn"
            type="button"
            onClick={() => {
              this.toggleQuestionsModal("AddQuestionModal");
            }}
          >
            ADD QUESTION
          </button>
        </div>
      </div>
    );

    switch (view) {
      case "AddQuestionModal":
        return (
          <>
            <AddQuestionModal
              productId={this.props.productId}
              toggleQuestionsModal={this.toggleQuestionsModal}
              addQuestion={this.addQuestion}
            />
            {QuestionsAnswersComponent}
          </>
        );

      default:
        return <>{QuestionsAnswersComponent}</>;
    }
  }
}

export default QuestionsAnswers;
