import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Blob from "./Blob";
import RecipeCard from "./RecipeCard";
import RecipeDetails from "./RecipeDetails";
import styled from "styled-components";
import {topIngredientsList} from "../util/topIngredientsList";
import {
  searchInstructions,
  searchRecipes,
} from "../util/fetchAPI";
import {
  RecipeRequest,
  IRecipe,
  InstructionsRequest,
  IInstructions,
  ITopIngredient
} from "../interfaces/Recipe";

interface BlobsContainerProps {
  userSearchedRecipes: Boolean;
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: lightblue;
  display: grid;
  grid-template-columns: 350px 1fr;
`;

const BlobsContainer = styled.div<BlobsContainerProps>`
grid-area: 1 / 2 / 2 / 3;
background-color: #ebe6da;
padding: 10px;
display: grid;
grid-template-columns: ${props => !props.userSearchedRecipes ? `1fr 1fr 1fr 1fr` : `1fr 1fr`};
grid-auto-rows: 250px;
grid-gap: 10px;
overflow: auto;
`;

const MainContainer = () => {
    // array of ingredient names user selected
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const [searchedRecipes, setSearchedRecipes] = useState<IRecipe[]>([]);
    // Conditonally render ingredients or recipes
    const [userSearchedRecipes, setUserSearchedRecipes] =
      useState<Boolean>(false);
    const [displayBlobs, setDisplayBlobs] = useState<Boolean>(true);
    const [selectedRecipeImage, setSelectedRecipeImage] = useState<string>("");
    const [recipeInstructions, setRecipeInstructions] = useState<IInstructions[]>([]);
    const [selectedRecipes, setSelectedRecipes] = useState<IRecipe[]>([]);


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

  const addIngredient = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients((prevState: string[]) => [
        ...prevState,
        ingredient,
      ]);
    }
  }

  const renderBlobs = (): JSX.Element[] => {
    const blobs = topIngredientsList.map((ingredient: ITopIngredient) => {
      return (
        <Blob
          key={ingredient.id}
          ingredientName={ingredient.name}
          addIngredient={addIngredient}
        />
      );
    });

    return blobs;
  };

  const getRecipeDetails = (id: number) => {
    const recipeObj = searchedRecipes.filter((recipe) => recipe.id === id)[0];
    setSelectedRecipeImage(recipeObj.image);
    setDisplayBlobs(false);
    getRecipeSteps(id);
  };

  const getRecipeSteps = async (id: number) => {
    const instructions = await fetchInstructionsById(id);
    setRecipeInstructions(instructions);
  };

  const renderCards = (): JSX.Element[] => {
    if (searchedRecipes.length) {
      const cards = searchedRecipes.map((recipe) => {

        return (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            getRecipeDetails={getRecipeDetails}
            setSelectedRecipes={setSelectedRecipes}
          ></RecipeCard>
        );
      });
      return cards;
    } else return [];
  };
  console.log(`recipes []`, selectedRecipes)

  return (
    <Container>
      <Sidebar
        setUserSearchedRecipes={setUserSearchedRecipes}
        searchByIngredients={searchByIngredients}
        setSelectedIngredients={setSelectedIngredients}
        selectedIngredients={selectedIngredients}
        setSearchedRecipes={setSearchedRecipes}
        selectedRecipes={selectedRecipes}
        getRecipeDetails={getRecipeDetails}
      />
      <BlobsContainer userSearchedRecipes={userSearchedRecipes}>
        {/* Render Cards/Blobs OR Details */}
        {displayBlobs ? (
          userSearchedRecipes? renderCards() : renderBlobs()
        ) : (
          <RecipeDetails
            recipeInstructions={recipeInstructions}
            selectedRecipeImage={selectedRecipeImage}
          />
        )}
      </BlobsContainer>
    </Container>
  );
}
export default MainContainer;
