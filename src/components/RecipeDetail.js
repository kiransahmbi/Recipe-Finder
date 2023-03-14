import React from "react";
import axios from 'axios';
import {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import lodash from "lodash";

export default function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState();  
    const API_KEY = process.env.REACT_APP_API_KEY;
    const healthData = ["dairyFree", "glutenFree", "ketogenic", "vegan", "vegetarian"];

    useEffect(() => {
        axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`).then(response => setRecipe(response.data));
    }, []);

  return (
    <div className="container text-center px-5">
        <div className="container-fluid">
        
        {recipe && 
            <div className="row" >
                <h1 className=" display-4 my-4">{recipe.title}</h1>
                <div className="row px-0">
                    <div className="col-lg-8 col-sm-12 px-sm-0 pe-lg-3">
                        <img src={recipe.image} className="h-100 w-100 rounded" />
                    </div>

                    <div className="col-lg-4 col-sm-12 card py-3 px-4  my-sm-2 my-md-3 my-lg-0">
                        <h1 className="display-6 mb-4">Recipe Information</h1>
                        <table className="table table-borderless my-3">
                            <tbody>
                                <tr>
                                    <td><i class="bi bi-pie-chart-fill"></i></td>
                                    <td className="h6"><b>Serves</b></td>
                                    <td> {recipe.servings} </td>
                                </tr>
                                <tr>
                                    <td><i class="bi bi-clock"></i></td>
                                    <td className="h6 text-left"><b>Time (min)</b></td>
                                    <td> {recipe.readyInMinutes} </td>
                                </tr>
                                <tr>
                                    <td><i class="bi bi-heart-fill"></i></td>
                                    <td className="h6"><b>Health Score</b></td>
                                    <td> {recipe.healthScore} </td>
                                </tr>
                                <tr>
                                    <td><i class="bi bi-hand-thumbs-up-fill"></i></td>
                                    <td className="h6"><b>Likes</b></td>
                                    <td> {recipe.aggregateLikes} </td>
                                </tr>
                            </tbody>
                        </table>
                        {healthData.map(attribute => {
                            return recipe[attribute] && (
                                <div className="btn mt-3 mb-1 mx-2 btn-outline-secondary"> {lodash.startCase(attribute)} </div>
                            )
                        })}
                    </div>
                    
                    <div className="my-sm-0 my-md-3 col-lg-12 col-sm-12 card py-3 px-4">
                        <div className="my-3 col-lg-8 col-sm-12 mx-auto py-3 px-4">
                            <h1 className="display-6 mb-4">Ingredient List</h1>
                            <table className="table table-borderless my-2 table-hover table-striped">
                                <tbody>
                                    {recipe.extendedIngredients.map(ingredient => {
                                        return (
                                            <tr key={ingredient.id}>
                                                <td>{ingredient.measures.metric.amount}</td>
                                                <td>{lodash.startCase(ingredient.measures.metric.unitLong)}</td>
                                                <td>{lodash.startCase(ingredient.name)}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="my-sm-2 my-lg-2 py-5 col-lg-12 col-sm-12 card py-3 px-5">
                        <h1 className="display-6 mb-2">Instructions</h1>
                        <table className="table table-borderless table-striped table-hover my-2 px-5">
                            <thead>
                                <tr>
                                <th className="px-sm-0 px-md-5">Step</th>
                                <th className="px-sm-0 px-md-5">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recipe.analyzedInstructions[0].steps.map(step => {
                                    return (
                                        <tr key={step.number}>
                                            <td className="px-sm-1 px-md-5"><b>{step.number}</b></td>
                                            <td className="px-sm-1 px-md-5">{step.step} </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>


                </div>    
                
            </div>
        }
        </div>
    </div>
  );
}



