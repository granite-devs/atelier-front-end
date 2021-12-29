import React from 'react';

const SearchBar = (props) => {
  return (
    <div id="search-bar-component">
      <label name='question-search'></label>
      <input
        id="search-input"
        type='text'
        placeholder='Need an answer? Search here!'
        onChange={() => {
          let searchTerm = document.getElementById('search-input').value;
          props.filterQuestionsList(searchTerm)
        }}
      ></input>
    </div>
  )
}

export default SearchBar;