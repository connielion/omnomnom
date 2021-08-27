import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Blob from "./Blob";
import RecipeCard from './RecipeCard';
import styled from "styled-components";
import { topIngredientsList } from "../util/topIngredientsList";
import {
  fetchAllIngredients,
  searchInstructions,
  searchRecipes,
} from "../util/fetchAPI";
import {
  RecipeRequest,
  IRecipe,
  IngredientsRequest,
  ISelectableIngredient,
  InstructionsRequest,
  IInstructions,
} from "../interfaces/Recipe";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: lightblue;
    display: grid;
    grid-template-columns: 350px 1fr;
  `;


const BlobsContainer = styled.div`
  grid-area: 1 / 2 / 2 / 3;
  background-color: #ebe6da;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 250px;
  grid-gap: 10px;
  overflow: scroll;
`;

const MainContainer = () => {
  // array of ingredient names user selected 
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [searchedRecipes, setSearchedRecipes] = useState<IRecipe[]>([]);
  // Conditonally render ingredients or recipes
  const [userSearchedRecipes, setUserSearchedRecipes] = useState<Boolean>(false)


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
  ): Promise<ISelectableIngredient[]> => {
    const request = new IngredientsRequest({ query });
    const ingredientsList = await fetchAllIngredients(request);
    return ingredientsList;
  };

  const renderBlobs = (): JSX.Element[] => {
    const blobs = topIngredientsList.map((ingredientName) => {
      return (
        <Blob
          key={ingredientName}
          ingredientName={ingredientName}
          setSelectedIngredients={setSelectedIngredients}
          selectedIngredients={selectedIngredients}
        />
      );
    });

    return blobs;
  };

  const renderCards = (): JSX.Element[]=>{
    if(searchedRecipes.length){
      const cards = searchedRecipes.map((recipe) => {
        const {id, title, image, missedIngredients, usedIngredients} = recipe;
        return <RecipeCard key={id} id={id} title={title} image={image} missedIngredients={missedIngredients} usedIngredients={usedIngredients} ></RecipeCard>
      })
      return cards;
    } else return [];
  }
 
  return (
    <Container>
      <Sidebar
        setUserSearchedRecipes={setUserSearchedRecipes}
        searchByIngredients={searchByIngredients}
        setSelectedIngredients={setSelectedIngredients}
        selectedIngredients={selectedIngredients}
        setSearchedRecipes={setSearchedRecipes}
      />
      <BlobsContainer>
        {userSearchedRecipes? renderCards() : renderBlobs()}
      </BlobsContainer>
    </Container>
  );
};

export default MainContainer;
