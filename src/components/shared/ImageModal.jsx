import React from 'react';

class ImageModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { image, closeFn } = this.props;

    return (
      <div className='modal'>
        <div className='image-modal'>
          <button onClick={closeFn}>
            Close
          </button>
          <img
          onClick={() => {
            window.location.replace(`${image.url}`)
          }}
          src={image.url}></img>
        </div>
      </div>
    );
  }
}

export default ImageModal;