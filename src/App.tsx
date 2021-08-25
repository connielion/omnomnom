import React, { useEffect, useState } from "react";
import "./App.css";
import {
  fetchAllIngredients,
  searchInstructions,
  searchRecipes,
} from "./util/fetchAPI";
import {
  RecipeRequest,
  IRecipe,
  IngredientsRequest,
  ISelectableIngredients,
  InstructionsRequest,
  IInstructions,
} from "./interfaces/Recipe";
import { topIngredientsList } from "./util/topIngredientsList";

function App() {
  const [recipesFound, setRecipesFound] = useState([]);
  const [recipeSearch, setRecipeSearch] = useState("");
  const [dataInCSV, setDataInCSV] = useState("");

  //arg: list of ingredients, returns a list of recipes(with recipe IDs used as args for fetchInstructionsById)
  const searchByIngredients = async (
    ingredients: string
  ): Promise<IRecipe[]> => {
    const request = new RecipeRequest({ ingredients });
    const recipes = await searchRecipes(request);
    return recipes;
  };
// returns specific recipe instructions
  const fetchInstructionsById = async (
    id: number
  ): Promise<IInstructions[]> => {
    const request = new InstructionsRequest({ id });
    const instructions = await searchInstructions(request);
    return instructions;
  };
// takes in query string(1 ingredient name from topIngredientsList)
  const fetchIngredient = async (
    query: string
  ): Promise<ISelectableIngredients[]> => {
    const request = new IngredientsRequest({ query });
    const ingredientsList = await fetchAllIngredients(request);
    console.log(ingredientsList);
    return ingredientsList;
  };

  useEffect(()=>{
    console.log(topIngredientsList[0].name);
    fetchIngredientsList(topIngredientsList[0].name);
  },[])

  return <div className="App">
  </div>;
}

export default App;
