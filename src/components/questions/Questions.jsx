import React from 'react';

class Questions extends React.Component {
  render() {
    const { productId } = this.props;
    return (
      <>
        <h1>
          This man {productId}
        </h1>
      </>
    );
  }
}

export default Questions;
