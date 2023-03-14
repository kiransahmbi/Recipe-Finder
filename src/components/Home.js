import React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        navigate(`/search-results`, {state: {
            searchInput: searchInput
        }});
    }

    return (
        <div className="container text-center px-5 centered">
            <div className="container-fluid">
                <h1 className="display-1 py-3 rounded">Recipe Finder</h1>
                <p className="lead my-3">Search for your favourite recipes!</p>
                <form className="form-inline my-4 w-50 mx-auto" onSubmit={handleSubmit}>
                    <input className="form-control mr-sm-2" name="Search" type="search" placeholder="Search" value={searchInput} onChange={e => setSearchInput(e.target.value)} />
                    <button className="btn btn-lg btn-success my-4" type="submit">Search</button>
                </form>
            </div>
        </div>
    );
}



