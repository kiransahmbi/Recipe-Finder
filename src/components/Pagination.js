import React from 'react';
import {useState, useEffect } from 'react';

export default function Pagination ({ recipesPerPage, totalRecipes, paginate }) {
   const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    setPageNumbers([...Array(Math.ceil(totalRecipes / recipesPerPage)).keys()].map(x => ++x))
  }, [totalRecipes]);

  return (
    <nav className='mt-3 pb-5'>
      <ul className='pagination justify-content-center'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <button onClick={() => paginate(number)} className='page-link'>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};