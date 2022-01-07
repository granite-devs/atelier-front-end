import React from 'react';
import axios from 'axios';
import API_KEY from '../../../config.js'

const AddQuestionModal = (props) => {

  const { productId, addQuestion, toggleQuestionsModal } = props;
  const { localStorage } = window;
  const product = JSON.parse(localStorage.getItem(`${productId}`))
  const { name } = product.details;

  return (
    <div
      className='modal'>
      <div className='form'>
        <div className='field-item'>
          <h3> Ask your question about {name} </h3>
        </div>
        <div className='field-item'>
          <label name='question-body'>Your question: </label>
          <textarea
            id='question-input'
            name='question-body'
            maxLength='1000'
            type='text'
            rows='8'
            required
          />
        </div>
        <div className='field-item'>
          <label name='question-username'> Username  </label>
          <input
            id='question-username-input'
            name='question-username'
            maxLength='60'
            type='text'
            placeholder='Example: jackson11!'
            required
          />
        </div>
        <div className='field-item'>
          <label name='question-email'> Email </label>
          <input
            id='question-email-input'
            name='question-email'
            type='email'
            maxLength='60'
            placeholder='jackson11@emailprovider.com'
            required
          />
        </div>
        <div className='button-container'>
          <button
            onClick={() => {

              const username = document.querySelector('#question-username-input').value;
              const email = document.querySelector('#question-email-input').value;
              const questionText = document.querySelector('#question-input').value;

              if (username && email && questionText) {
                addQuestion({
                  name: username,
                  body: questionText,
                  email: email
                });
              };

            }}
            className='big-btn'
            type='button'>
            Submit
          </button>
          <button
            className='big-btn'
            onClick={() => {
              toggleQuestionsModal('main')
            }}> Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddQuestionModal;