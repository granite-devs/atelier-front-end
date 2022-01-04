import API_KEY from "../config.js";
import axios from "axios";

export function getQuestions(productId) {
  return new Promise((resolve, reject) => {
    const config = {
      method: "get",
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/qa/questions?product_id=${productId}&count=100`,
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

export default { getQuestions, postQuestion };
