
import React from "react";
import Overview from "./components/overview/Overview.jsx";
import Reviews from "./components/reviews/Reviews.jsx";
import Questions from "./components/questions/Questions.jsx";
import Related from "./components/related/Related.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 11 // TODO - find out what this should actually be.
    };
    this.updatedProductId = this.updatedProductId.bind(this);
  }

  updatedProductId(productId) {
    this.setState({ productId });
  }

  render() {
    const { productId } = this.state;
    return (
      <div id="app">
        <Overview productId={productId} />
        <Reviews productId={productId} />
        <Questions productId={productId} />
        <Related productId={productId} updatedProductId={this.updatedProductId} />
      </div>
    );
  }
}

export default App;
