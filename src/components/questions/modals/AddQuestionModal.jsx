import React from 'react';
import axios from 'axios';
import API_KEY from '../../../config.js'

const AddQuestionModal = (props) => {

  return (
    <div className='modal'>
      <div className='question-form'>
        <div className='field-item'>
          <button
            className='btn'
            onClick={() => {
              props.toggleQuestionsModal('main')
            }}> Close
          </button>
          <h1>Ask your question about {props.productId}</h1>
        </div>
        <div className='field-item'>
          <label name='question-body'>Ask your question!</label>
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
        <div className='field-item'>
          <button
            onClick={() => {

              const username = document.querySelector('#question-username-input').value;
              const email = document.querySelector('#question-email-input').value;
              const questionText = document.querySelector('#question-input').value;
              const date = new Date();

              if (username && email && questionText) {
                props.addQuestion({
                  answers: {},
                  isVisible : true,
                  asker_name: username,
                  question_body: questionText,
                  question_date: date.toISOString(),
                  question_helpfulness: 1,
                  reported: false,
                  email: email
                })
              }
            }}
            className='btn'
            type='button'>
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddQuestionModal;