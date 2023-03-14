import React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {

  const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        navigate(`/search-results`, {state: {
            searchInput: searchInput
        }});
    }

    return (
        <nav className="navbar navbar-expand-lg bg-light p-4 justify-content-between">
          <a className="navbar-brand" href="/">Recipe Finder</a>
          <form className="form-inline input-group my-2 my-lg-0 w-25" onSubmit={handleSubmit}>
            <input className="form-control mr-sm-2" type="search" placeholder="Search Recipes" aria-label="Search" value={searchInput} onChange={e => setSearchInput(e.target.value)} />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </nav>
    );
}

export default Header;
