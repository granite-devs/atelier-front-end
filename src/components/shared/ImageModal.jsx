import React from 'react';

class ImageModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { image, closeFn } = this.props;

    return (
      <div className='modal'>
        <div className='imageModal'>
          <button onClick={closeFn}>
            Close
          </button>
          <img src={image.url}></img>
        </div>
      </div>
    );
  }
}

export default ImageModal;