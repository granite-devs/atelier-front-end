
import React from "react";
import Overview from "./components/overview/Overview.jsx";
import Reviews from "./components/reviews/Reviews.jsx";
import Questions from "./components/questions/Questions.jsx";
import Related from "./components/related/Related.jsx";

class App extends React.Component {

  render() {
    return (
      <div id="app">
        <Overview />
        <Reviews />
        <Questions />
        <Related />
      </div>
    );
  }
}

export default App;
