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
          <img
            onClick={() => {
              window.open(`${image.url}`)
            }}
            src={image.url}
          />
          <button onClick={closeFn}>
            Close
          </button>
        </div>

      </div>
    );
  }
}

export default ImageModal;