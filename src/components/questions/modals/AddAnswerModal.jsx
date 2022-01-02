import React from 'react';

const AddAnswerModal = (props) => {

  return (
    <div id="add-answer-modal">
      <label for="nickname"> NickName: </label>
      <input
      name="nickname"
      type="text"
      required
      placeholder="Add a nickname.."
      ></input>
    </div>
  )
}

export default AddAnswerModal;