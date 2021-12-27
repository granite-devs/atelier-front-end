import React from 'react';

class Questions extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <>
        <h1>
          This man {name}
        </h1>
      </>
    );
  }
}

export default Questions;
