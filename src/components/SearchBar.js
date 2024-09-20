import React from 'react';

function SearchBar() {
  return (
    <div className="relative mb-4">
      <input type="text" className="w-full p-2 pl-10 border border-gray-300 rounded-md" placeholder="Search by name, email..." />
      <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M12.9 14.32a7.5 7.5 0 1 1 1.42-1.42l4.25 4.26a1 1 0 0 1-1.42 1.42l-4.25-4.26zM10 15.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z" clipRule="evenodd"></path>
      </svg>
    </div>
  );
}

export default SearchBar;
