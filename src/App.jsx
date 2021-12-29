import React from 'react';
import axios from 'axios';
import Overview from './components/overview/Overview.jsx';
import Reviews from './components/reviews/Reviews.jsx';
import QuestionsAnswers from './components/questions/QuestionsAnswers.jsx';
import Related from './components/related/Related.jsx';
import API_KEY from './config.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: null
    };
    this.updateAppProductId = this.updateAppProductId.bind(this);
  }

  updateAppProductId(productId) {
    this.setState({ productId });
  }

  componentDidMount() {

    const intializationConfig = {
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products',
      headers: {
        Authorization: API_KEY,
      },
    };

    axios(intializationConfig)
      .then((response) => {
        this.setState({ productId: response.data[0].id }); // sets the id of the first prodcut in the list as the init id
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { productId } = this.state;
    return (
      <div>
        <Overview key={`${productId}-1`} productId={productId} />
        <Reviews key={`${productId}-2`} productId={productId} />
        <QuestionsAnswers key={`${productId}-3`} productId={productId} />
        <Related
          key={`${productId}-4`}
          productId={productId}
          updateAppProductId={this.updateAppProductId}
        />
      </div>
    );
  }
}

export default App;
