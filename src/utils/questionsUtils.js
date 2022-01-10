import API_KEY from "../config.js";
import axios from "axios";

export function getQuestions(productId) {
  return new Promise((resolve, reject) => {
    const config = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/qa/questions?product_id=${productId}&count=50`,
      headers: {
        Authorization: API_KEY,
      },
    };

    axios(config)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

export function postQuestion(question, productId) {
  return new Promise((resolve, reject) => {

    question.product_id = productId;

    const config = {
      method: "post",
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/qa/questions?product_id=${productId}`,
      headers: {
        Authorization: API_KEY,
        "Content-Type": "application/json",
      },
      data: question,
    };

    axios(config)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(error);
      })
  });
}


export function putHelpfulQuestion(question_id) {
  return new Promise((resolve, reject) => {
    const config = {
      method: 'put',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/qa/questions/${question_id}/helpful`,
      headers: {
        'Authorization': API_KEY,
        'Content-Type': 'Application/json'
      }
    };

    axios(config)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      })
  })
}

export function getAnswers(questionId) {
  return new Promise((resolve, reject) => {
    const config = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/qa/questions/${questionId}/answers?count=50`,
      headers: {
        'Authorization': API_KEY
      }
    };

    axios(config)
      .then((response) => {
        resolve(response.data.results)
      })

      .catch((error) => {
        reject(error);
      });
  })
}

export function postAnswer(answer, questionId) {
  return new Promise((resolve, reject) => {

    const data = JSON.stringify(answer);

    const config = {
      method: 'post',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/qa/questions/${questionId}/answers`,
      headers: {
        'Authorization': API_KEY,
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then((response) => {
        resolve(response)
      })

      .catch((error) => {
        reject(error);
      });
  })
}

export function putHelpfulAnswer(answerId) {
  return new Promise((resolve, reject) => {
    const config = {
      method: 'put',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/qa/answers/${answerId}/helpful`,
      headers: {
        'Authorization': API_KEY,
        'Content-Type': 'Application/json'
      }
    };

    axios(config)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      })
  })
}




export default {
  getQuestions,
  postQuestion,
  putHelpfulQuestion,
  getAnswers,
  postAnswer,
  putHelpfulAnswer
};
