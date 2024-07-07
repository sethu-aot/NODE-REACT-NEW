/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import searchIcon from '../../assets/images/search.svg'
import './SearchBar.css'

function SearchBar({ handleSearchChange, handleSortChange }) {
  return (
    <div className='SearchContainer'>
      <div className="searchbox">
        <input type="text" name="search" id="search" placeholder='Search by task name' onChange={handleSearchChange}/>
        <img src={searchIcon} alt="Search Icon" />
      </div>
      <div>
        Sort by: 
        <select name="select" id="select" onChange={handleSortChange}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
