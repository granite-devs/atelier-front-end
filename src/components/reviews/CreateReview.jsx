import axios from 'axios';
import React from 'react';
import API_KEY from '../../config.js';
import AttatchImage from '../shared/AttatchImage.jsx';
import StarInput from '../shared/StarInput.jsx';

class CreateReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      recommended: null,
      characteristics: {},
      summary: null,
      body: null,
      photoLinks: [],
      username: null,
      email: null
    };
    this.setRating = this.setRating.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  getSelectedIndex(form, name) {
    for (let i = 1; i < 6; i++) {
      if (form[`${name}${i}`].checked) {
        return i;
      }
    }
    return null;
  }

  setRating(rating) {
    this.setState({ rating });
  }

  validateState() {
    const {
      rating,
      recommended,
      characteristics,
      summary,
      body,
      username,
      email
    } = this.state;

    const fails = {
      failed: false
    };

    if (rating === 0) {
      fails.rating = 'Please rate this product';
      fails.failed = true;
    }
    if (recommended === null) {
      fails.recommended = 'Please indicate whether you would recommend buying this product';
      fails.failed = true;
    }
    const { characteristics: characteristicsObj } = this.props.reviewsMetaData;
    for (let name in characteristicsObj) {
      if (!characteristics[name]) {
        fails[name] = `Please indicate the ${name.toLowerCase()} of the product`;
        fails.failed = true;
      }
    }
    if (body) {
      if (body.length < 50) {
        fails.body = 'Review body must be at least 50 characters';
        fails.failed = true;
      }
      if (body.length > 1000) {
        fails.body = 'Review body can be no longer than 1000 characters';
        fails.failed = true;
      }
    } else {
      fails.body = 'Please write a review body';
      fails.failed = true;
    }
    if (username === null) {
      fails.username = 'Please enter a name';
      fails.failed = true;
    }
    if (email === null) {
      fails.email = 'Please enter an email';
      fails.failed = true;
    }
    return fails;
  }

  onSubmit(e) {
    e.preventDefault();
    this.onChange({ target: { form: e.target } });
    const {
      rating,
      recommended,
      characteristics,
      summary,
      body,
      photoLinks,
      username,
      email
    } = this.state;
    const {
      product_id: productId,
      characteristics: characteristicsObj
    } = this.props.reviewsMetaData;

    const validation = this.validateState();
    if (validation.failed) {

    } else {
      const characteristicsData = {};
      for (let name in characteristicsObj) {
        characteristicsData[characteristicsObj[name].id] = characteristics[name];
      }
      const reviewPostBody = {
        'product_id': parseInt(productId),
        'rating': parseInt(rating),
        'summary': summary,
        'body': body,
        'recommend': recommended,
        'name': username,
        'email': email,
        'photos': photoLinks,
        'characteristics': characteristicsData
      };

      const postConfig = {
        method: 'post',
        url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/reviews',
        headers: {
          Authorization: API_KEY,
        },
        data: reviewPostBody
      };

      axios(postConfig)
        .then((response) => {
          this.props.onReviewSubmitted();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  onChange({ target: { form } }) {
    const rating = form[0].value;
    const recommended = form.yes.checked;

    const { characteristics: characteristicsObj } = this.props.reviewsMetaData;

    const characteristics = {};
    for (let name in characteristicsObj) {
      characteristics[name] = this.getSelectedIndex(form, name);
    }

    const summary = form.summary.value;
    const body = form.body.value;

    const photoLinks = [];
    for (let i = 0; i < 5; i++) {
      if (form[`image${i}`]) {
        photoLinks.push(form[`image${i}`].value);
      }
    }

    const username = form.username.value;
    const email = form.email.value;

    this.setState({
      rating,
      recommended,
      characteristics,
      summary,
      body,
      photoLinks,
      username,
      email
    });
  }

  render() {

    const { characteristics: characteristicsObj } = this.props.reviewsMetaData;
    const characteristicsNames = [];
    for (let name in characteristicsObj) {
      characteristicsNames.push(name);
    }

    const characteristicsText = {
      'Size': ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'],
      'Width': ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
      'Comfort': ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
      'Quality': ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
      'Length': ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
      'Fit': ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']
    };

    const {
      rating,
      recommended,
      characteristics,
      imageModalOpen,
      photoLinks
    } = this.state;
    return (
      <div className='createReview'>
        <form onSubmit={this.onSubmit} onChange={this.onChange}>
          <h2>Write a new review</h2>
          <label>Overall rating: *</label>
          <StarInput rating={rating} setRating={this.setRating} />
          <br></br>
          <label>Do you recommend this product? *</label>
          <div>
            <label>Yes</label>
            <input type="radio" id="yes" name="recommend" value="yes"></input><br></br>
            <label>No</label>
            <input type="radio" id="no" name="recommend" value="no"></input><br></br>
          </div>
          <br></br>
          <label>Characteristics: *</label>
          {characteristicsNames.map((name, i) => (
            <table key={i}>
              <caption><b>{name}</b> - {characteristicsText[name][characteristics[name] - 1]}</caption>
              <tbody>
                <tr>
                  <td><span>{characteristicsText[name][0]}</span></td>
                  <td><input id={`${name}1`} type="radio" name={`${name}`} value="1"></input><br></br></td>
                  <td><input id={`${name}2`} type="radio" name={`${name}`} value="2"></input><br></br></td>
                  <td><input id={`${name}3`} type="radio" name={`${name}`} value="3"></input><br></br></td>
                  <td><input id={`${name}4`} type="radio" name={`${name}`} value="4"></input><br></br></td>
                  <td><input id={`${name}5`} type="radio" name={`${name}`} value="5"></input><br></br></td>
                  <td><span>{characteristicsText[name][4]}</span></td>
                </tr>
              </tbody>
            </table>
          ))}
          <label>Review summary:</label>
          <input type='text' id='summary'></input>
          <br></br>
          <label>Review body: *</label>
          <br></br>
          <textarea id='body' maxLength={1000}></textarea>
          <br></br>
          <AttatchImage
            maxImages={5}
            imageLinks={photoLinks}
          />
          <br></br>
          <label>Your nickname: *</label>
          <input type='text' id='username' placeholder='Example: jackson11!' maxLength={60}></input>
          <br></br>
          <small>For privacy reasons, do not use your full name or email address</small>
          <br></br>
          <br></br>
          <label>Your email: *</label>
          <input type='email' id='email' placeholder='Example:  jackson11@email.com' maxLength={60}></input>
          <br></br>
          <small>For authentication reasons, you will not be emailed</small>
          <br></br>
          <br></br>
          <input className='big-btn' type='submit'></input>
          <button id='close-review-btn' className='big-btn' onClick={this.props.closeFn}>Close</button>

          <br></br>
          <br></br>
        </form>
      </div>
    );
  }
}

export default CreateReview;