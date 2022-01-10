import React from 'react';

class AttatchImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploading: false,
      isLinking: false,
      link: '',
      imageLinks: this.props.imageLinks,
      modalOpen: false
    };
    this.uploadImage = this.uploadImage.bind(this);
    this.linkImage = this.linkImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLink = this.handleLink.bind(this);
  }

  uploadImage() {
    // TODO
    this.setState({ isUploading: true, isLinking: false });
  }

  linkImage() {
    const { imageLinks } = this.state;
    this.setState({ isUploading: false, isLinking: true });
  }

  handleChange({ target }) {
    this.setState({ link: target.value });
  }

  handleLink() {
    const { imageLinks, link } = this.state;
    if (imageLinks.length >= this.props.maxImages) {
      this.setState({ modalOpen: false });
    } else {
      imageLinks.push(link);
      this.setState({ imageLinks, link: '' });
    }
  }

  render() {
    const { isUploading, isLinking, imageLinks, link, modalOpen } = this.state;

    let message = null;
    if (isUploading) {
      message = <p>Sorry, image uploading is not availiable. Please provide a link to an image instead.</p>;
    } else if (isLinking) {
      message = <div>
        <p>Link to image:</p>
        <input type='text' onChange={this.handleChange} value={link}></input>
        <button onClick={this.handleLink}>Attach Image</button>
      </div>;
    }

    if (modalOpen) {
      return (
        <div className='modal'>
          <div className='attachImage'>
            {imageLinks.map((link, i) => (
              <div className='imgPreview' key={i}>
                <img src={link} height={50}></img>
                <input id={`image${i}`} type='hidden' value={link}></input>
              </div>
            ))}
            <div id='attach-image-btn-container'>
              <button className='big-btn' onClick={this.uploadImage}>Upload Image</button>
              <button className='big-btn' onClick={this.linkImage}>Link to Image</button>
              <button className='big-btn' onClick={() => this.setState({ modalOpen: false })}>
              Close
            </button>
            </div>

            {message}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          {imageLinks.map((link, i) => (
            <div className='imgPreview' key={i}>
              <img src={link} height={50}></img>
              <input id={`image${i}`} type='hidden' value={link}></input>
            </div>
          ))}
          <br></br>
          {imageLinks.length < this.props.maxImages ? (
            <button className='big-btn' onClick={() => this.setState({ modalOpen: true })}>
              Attatch Image
            </button>
          ) : null}
        </div>
      );
    }


  }
}

export default AttatchImage;