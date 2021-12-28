import React from 'react';

class DefaultView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      mainImage: []
    };

  }

  componentDidMount () {
    if (this.props.photos !== undefined) {
      this.setState({
        photos: this.props.photos,
        mainImage: this.props.photos[0]
      });
    }
  }

  // useEffect (() => {
  //   if (photos) {
  //     setIsShowing(photos);
  //     setMainImage(photos[0].url);
  //   }
  // });

  // const handleMainImage = (event) => {
  //   event.preventDefault();
  //   let clickedImg = event.target.src;
  //   console.log(clickedImg);
  //   setMainImage(clickedImg);
  // };

  render () {
    return (
      <div>
        hello
      </div>
    );
  }
}


export default DefaultView;
