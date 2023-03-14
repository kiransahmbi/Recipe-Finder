import React from "react";
import axios from 'axios';
import {useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { cuisineList } from './cuisines'
import Pagination from './Pagination';

export default function SearchResults() {
  const { state } = useLocation();
  const [searchInput, setSearchInput] = useState(state.searchInput);
  const [recipeList, setRecipeList] = useState();
  const [recipeNumber, setRecipeNumber] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState();
  const [filterList, setFilterList] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(6);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const paginate = pageNumber => setCurrentPage(pageNumber);
  
  // Get Recipes Based on Search Query and Any Filters
  useEffect(() => {
    axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${searchInput}${filterList && `&cuisine=${filterList.join(',')}`}&number=12&apiKey=${API_KEY}`).then(response => {
      setRecipeList(response.data);
      setRecipeNumber(Object.keys(response.data.results).length);
    });
  }, [searchInput, filterList]);

  // Search for Recipes from Search Bar
  useEffect(() => {
    setSearchInput(state.searchInput);
    setFilterList([]);
    setCurrentPage(1);
    recipeList && setRecipeNumber(Object.keys(recipeList.results).length);
  }, [state]);
  
  // Add Filter to List
  function handleFilter(e) {
    setFilterList([...filterList, e.target.value]);
    setCurrentPage(1);
  }

  // Delete Filter From List
  function deleteFilter(filter) {
    setFilterList(filterList.filter(item => item !== filter));
    setCurrentPage(1);
  }

  return (
    <div>
        {recipeList && (
            <div className="container-fluid text-center">
                <h1 className="display-5 pt-5 pb-2">{recipeNumber} Search Results for <i>"{searchInput}"</i></h1>
                <div className="my-2">
                  {filterList && filterList.map(filter => {
                    return (
                    <a key={filter} className="btn mt-3 mb-1 mx-2 btn-secondary" onClick={() => deleteFilter(filter)}>
                      {filter} <i className="bi bi-x-lg"></i>
                    </a>)
                  })}
                </div>
                <form className="form-inline input-group my-4 w-50 mx-auto">
                  <label htmlFor="cuisine" className="lead">Filter By Cuisine: </label>
                  <select id="cuisine" name="cuisine" className="form-select rounded mx-3 py-0 px-3" value={selectedFilter} onChange={handleFilter}>
                    {cuisineList.map(cuisine => {
                      return (<option key={cuisine} value={cuisine}>{cuisine}</option>)
                    })}
                  </select>
                </form>
                
                <div className="row mx-auto">
                    {recipeList.results.slice(indexOfFirstRecipe, indexOfLastRecipe).map(function(recipe) {
                        return (
                            <div key={recipe.id} className="col-lg-4 col-sm-12 my-2">
                                <a href={`/recipe-details/${recipe.id}`} className="link">
                                <div className="card h-100" key={recipe._id}>
                                    <img className="card-img-top w-100" src={recipe.image} alt={recipe.title} />
                                    <div className="card-body">
                                        <h5 className="card-title">{recipe.title}</h5>
                                    </div>
                                </div>
                                </a>
                            </div>
                        )})}
                </div>
                <Pagination 
                  recipesPerPage={recipesPerPage}
                  totalRecipes={recipeNumber}
                  paginate={paginate}
                />  
            </div>
        )}
        
    </div>
  );
}



