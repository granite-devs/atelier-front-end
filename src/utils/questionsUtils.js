import API_KEY from '../config.js';
import axios from 'axios';

const makeAxiosRequest = (type, id, data) => {
  console.log('Making request with this id ', id)
  return new Promise((rej, resolve) => {
    let configs = {
      getQuestionConfig: {
        method: 'get',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/qa/questions?product_id=${id}`,
        headers: {
          Authorization: API_KEY
        }
      },

      getAnswersConfig: {
        method: 'get',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/qa/questions/${id}/answers`,
        headers: {
          'Authorization': API_KEY
        }
      }
    }

    if (type === 'getQuestions') {
      axios(configs.getQuestionConfig)
      .then((response) => {
        console.log('This is the mod response ', response.data.results)
        resolve(response.data.results)
      })
      .catch((err) => {
        rej(err)
      })
    }
  })
}





export default makeAxiosRequest;