import React from 'react';
import axios from 'axios';
import API_KEY from '../../../config.js';


const AddAnswerModal = (props) => {

  return (
    <div className='modal'>
      <div className='answer-form'>
        <div className='field-item'>
          <button
            className='btn'
            onClick={() => {
              props.toggleAddAnswerModal('main')
            }}> Close
          </button>
          <h1>Submit Your Answer</h1>
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
            type='file'
            multiple
          />
        </div>
        <div className='field-item'>
          <button
            id='submit-answer-btn'
            onClick={() => {

              const body = document.querySelector('#answer-input').value;
              const name = document.querySelector('#answer-user-input').value;
              const email = document.querySelector('#answer-email-input').value;

              const answer = {body, name, email}

              if (body && name && email) {
                props.addAnswer(answer)
               }

            }}
            className='btn'
            type='button'>
            SUBMIT
          </button>
        </div>
      </div>
    </div >
  )
}

export default AddAnswerModal;