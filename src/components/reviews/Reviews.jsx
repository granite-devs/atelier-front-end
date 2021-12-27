import React from 'react';

class Reviews extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <>
        <h1>
          Hello {name}
        </h1>
      </>
    );
  }
}

export default Reviews;
