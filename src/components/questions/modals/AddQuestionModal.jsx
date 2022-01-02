import React from 'react';
import axios from 'axios';
import API_KEY from '../../../config.js'

const AddQuestionModal = (props) => {

  return (
    <div id='add-question-modal'>
      <div className='question-form'>
        <div className='field-item'>
          <button
            className='btn'
            onClick={() => {
              props.setQuestionsView()
            }}> Close
          </button>
          <h1>Ask your question about {props.productId}</h1>
        </div>
        <div className='field-item'>
          <label name='question-body'>Ask your question!</label>
          <textarea
            id='question-input'
            name='question-body'
            type='text'
            rows='8'
            required
          />
        </div>
        <div className='field-item'>
          <label name='Username'> Username  </label>
          <input
            id='username-input'
            name='username'
            type='text'
            placeholder='Example: jackson11!'
            required
          />
        </div>
        <div className='field-item'>
          <label name='email'> Email </label>
          <input
            id='email-input'
            name='email'
            type='email'
            placeholder='jackson11@emailprovider.com'
            required
          />
        </div>
        <div className='field-item'>
          <button
            onClick={() => {

              const username = document.querySelector('#username-input').value;
              const email = document.querySelector('#email-input').value;
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