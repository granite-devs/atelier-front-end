import React from 'react';
import axios from 'axios';
import API_KEY from '../../../config.js';


const AddAnswerModal = ({ toggleAnswerView, addAnswer }) => {

  return (
    <div
      className='modal'>
      <div className='form'>
        <div className='field-item'>
          <h3>Submit Your Answer</h3>
          <span id='alert'></span>
        </div>
        <div className='field-item'>
          <label name='answer-body'>Your Answer</label>
          <textarea
            id='answer-input'
            name='answer-body'
            type='text'
            maxLength='1000'
            rows='8'
            required
          />
        </div>
        <div className='field-item'>
          <label name='Username'> Username  </label>
          <input
            id='answer-user-input'
            name='answer-username'
            type='text'
            maxLength='60'
            placeholder='Example: jack543!'
            required
          />
        </div>
        <div className='field-item'>
          <label name='answer-email'> Email </label>
          <input
            id='answer-email-input'
            name='answer-email'
            type='email'
            maxLength='60'
            placeholder='jackson11@emailprovider.com'
            required
          />
        </div>
        <div className='field-item'>
          <input
            id='img-upload'
            type='file'
            accept='image/png, image/jpeg, image/jpg'
            multiple
          />
        </div>
        <div className='button-container'>
          <button
            id='submit-answer-btn'
            onClick={() => {

              const alert = document.querySelector('#alert')
              const body = document.querySelector('#answer-input').value;
              const name = document.querySelector('#answer-user-input').value;
              const email = document.querySelector('#answer-email-input').value;
              const images = document.querySelector('#img-upload').files;
              const photos = Object.values(images).map((image) => {
                let url = URL.createObjectURL(image)
                return url;
              })

              const answer = { body, name, email, photos };

              if (body && name && email) {
                addAnswer(answer)
              } else {
                alert.innerHTML = 'Invalid Inputs!'
                setTimeout(() => {
                  alert.innerHTML = '';
                }, 2000)
              }
            }}
            className='big-btn'
            type='button'>
            Submit
          </button>
          <button
            className='big-btn'
            onClick={() => {
              toggleAnswerView('main')
            }}> Close
          </button>
        </div>
      </div>
    </div >
  )
}

export default AddAnswerModal;