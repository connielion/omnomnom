import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Blob from "./Blob";
import RecipeCard from "./RecipeCard";
import RecipeDetails from "./RecipeDetails";
import styled from "styled-components";
import { topIngredientsList } from "../util/topIngredientsList";
import { searchInstructions, searchRecipes } from "../util/fetchAPI";
import {
  RecipeRequest,
  IRecipe,
  InstructionsRequest,
  IInstructions,
  ITopIngredient,
} from "../interfaces/Recipe";

interface BlobsContainerProps {
  userSearchedRecipes: Boolean;
  displayBlobs: Boolean;
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: lightblue;
  display: grid;
  grid-template-columns: 350px 1fr;
`;

// Destructured. Can also be written as > data: BlobsContainerProps
const dynamicColumn = ({
  displayBlobs,
  userSearchedRecipes,
}: BlobsContainerProps) => {
  // destructured will look this > data.displayBlobs
  if (displayBlobs) {
    return `${!userSearchedRecipes ? `1fr 1fr 1fr 1fr` : `1fr 1fr`}`;
  } else {
    return `1fr`;
  }
};

const dynamicRow = ({ displayBlobs }: BlobsContainerProps) => {
  if (displayBlobs) {
    return `250px`;
  } else {
    return `1fr`;
  }
};

const BlobsContainer = styled.div<BlobsContainerProps>`
  grid-area: 1 / 2 / 2 / 3;
  background-color: #ebe6da;
  padding: 10px;
  display: grid;
  grid-template-columns: ${(props) => dynamicColumn(props)};
  grid-auto-rows: ${(props) => dynamicRow(props)};
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
  const [selectedRecipe, setSelectedRecipe] = useState<IRecipe[]>([]);
  const [recipeInstructions, setRecipeInstructions] = useState<IInstructions[]>(
    []
  );
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

  const addRecipe = (e: React.MouseEvent<HTMLDivElement>, recipe: IRecipe) => {
    e.stopPropagation();
    if(!selectedRecipes.includes(recipe)){
      setSelectedRecipes((prevState: IRecipe[]) => [...prevState, recipe]);
    }
  };


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
    setSelectedRecipe([recipeObj]);
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
            addRecipe={addRecipe}
            key={recipe.id}
            recipe={recipe}
            getRecipeDetails={getRecipeDetails}
            setSelectedRecipes={setSelectedRecipes}
            selectedRecipes={selectedRecipes}
          ></RecipeCard>
        );
      });
      return cards;
    } else return [];
  };

  return (
    <Container>
      <Sidebar
        setUserSearchedRecipes={setUserSearchedRecipes}
        searchByIngredients={searchByIngredients}
        setSelectedIngredients={setSelectedIngredients}
        selectedIngredients={selectedIngredients}
        setSearchedRecipes={setSearchedRecipes}
        selectedRecipes={selectedRecipes}
        setSelectedRecipes={setSelectedRecipes}
        getRecipeDetails={getRecipeDetails}
        userSearchedRecipes={userSearchedRecipes}
        renderBlobs={renderBlobs}
        setDisplayBlobs={setDisplayBlobs}
      />
      <BlobsContainer
        userSearchedRecipes={userSearchedRecipes}
        displayBlobs={displayBlobs}
      >
        {/* Render Cards/Blobs OR Details */}
        {displayBlobs ? (
          userSearchedRecipes ? (
            renderCards()
          ) : (
            renderBlobs()
          )
        ) : (
          <RecipeDetails
            addRecipe={addRecipe}
            selectedRecipe={selectedRecipe}
            recipeInstructions={recipeInstructions}
            setDisplayBlobs={setDisplayBlobs}
            setUserSearchedRecipes={setUserSearchedRecipes}
          />
        )}
      </BlobsContainer>
    </Container>
  );
};
export default MainContainer;
