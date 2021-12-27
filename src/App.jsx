import React from "react";
import axios from "axios";
import Overview from "./components/overview/Overview.jsx";
import Reviews from "./components/reviews/Reviews.jsx";
import Questions from "./components/questions/Questions.jsx";
import Related from "./components/related/Related.jsx";
import API_KEY from "./config.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 11, // TODO - find out what this should actually be.
    };
    this.updatedProductId = this.updatedProductId.bind(this);
  }

  updatedProductId(productId) {
    this.setState({ productId });
  }

  componentDidMount() {

    const config = {
      method: "get",
      url: "https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products/39333",
      headers: {
        Authorization: API_KEY,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        this.setState({ productId: response.data.id });
      })

      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { productId } = this.state;
    return (
      <div>
        <Overview productId={productId} />
        <Reviews productId={productId} />
        <Questions productId={productId} />
        <Related
          productId={productId}
          updatedProductId={this.updatedProductId}
        />
      </div>
    );
  }
}

export default App;
