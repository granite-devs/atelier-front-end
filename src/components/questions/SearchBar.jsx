import React from 'react';

const SearchBar = ({ filterQuestionsList }) => {
  return (
    <div id="search-bar-container">
      <input
        id="search-input"
        type='text'
        placeholder='Need an answer? Search here!'
        onChange={() => {
          let searchTerm = document.querySelector('#search-input').value;
          filterQuestionsList(searchTerm)
        }}
      ></input>
    </div>
  )
}

export default SearchBar;