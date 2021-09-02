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
  hideRecipeDetails: Boolean;
  selectedIngredients: string[];
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
  hideRecipeDetails,
  userSearchedRecipes,
}: BlobsContainerProps) => {
  // destructured will look this > data.hideRecipeDetails
  if (hideRecipeDetails) {
    return `${!userSearchedRecipes ? `1fr 1fr 1fr 1fr` : `1fr 1fr`}`;
  } else {
    return `1fr`;
  }
};

const dynamicRow = ({ hideRecipeDetails }: BlobsContainerProps) => {
  if (hideRecipeDetails) {
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
  const [hideRecipeDetails, setHideRecipeDetails] = useState<Boolean>(true);
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
    if(ingredient !== ""){
      if (!selectedIngredients.includes(ingredient)) {
        setSelectedIngredients((prevState: string[]) => [
          ...prevState,
          ingredient,
        ]);
      }
    }
  };

  const removeIngredient = (ingredient: string) => {
    if (selectedIngredients.includes(ingredient)) {
      // filter and get array not containing target ingredient
      const updatedArray = selectedIngredients.filter(
        (name) => name !== ingredient
      );
      setSelectedIngredients(updatedArray);
    }
  };

  // Function to allow user to add recipe from RecipeCard and RecipeDetail pages
  const addRecipe = (e: React.MouseEvent<HTMLDivElement>, recipe: IRecipe) => {
    e.stopPropagation();
    if (!selectedRecipes.includes(recipe)) {
      setSelectedRecipes((prevState: IRecipe[]) => [...prevState, recipe]);
    }
  };

  const renderIngredientBlobs = (): JSX.Element[] => {
    const blobs = topIngredientsList.map((ingredient: ITopIngredient) => {
      return (
        <Blob
          key={ingredient.id}
          ingredientName={ingredient.name}
          addIngredient={addIngredient}
          selectedIngredients={selectedIngredients}
        />
      );
    });
    return blobs;
  };

  // Finds a recipe object by ID and save recipe to hook to get recipe
  const getRecipeDetails = (id: number) => {
    const recipeObj = searchedRecipes.filter((recipe) => recipe.id === id)[0];
    setSelectedRecipe([recipeObj]);
    setHideRecipeDetails(false);
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
        removeIngredient={removeIngredient}
        setUserSearchedRecipes={setUserSearchedRecipes}
        searchByIngredients={searchByIngredients}
        setSelectedIngredients={setSelectedIngredients}
        selectedIngredients={selectedIngredients}
        setSearchedRecipes={setSearchedRecipes}
        selectedRecipes={selectedRecipes}
        setSelectedRecipes={setSelectedRecipes}
        getRecipeDetails={getRecipeDetails}
        userSearchedRecipes={userSearchedRecipes}
        renderIngredientBlobs={renderIngredientBlobs}
        setHideRecipeDetails={setHideRecipeDetails}
      />
      <BlobsContainer
        userSearchedRecipes={userSearchedRecipes}
        hideRecipeDetails={hideRecipeDetails}
        selectedIngredients={selectedIngredients}
      >
        {/* Render Cards or Blobs OR Details */}
        {hideRecipeDetails ? (
          userSearchedRecipes ? (
            renderCards()
          ) : (
            renderIngredientBlobs()
          )
        ) : (
          <RecipeDetails
            addRecipe={addRecipe}
            selectedRecipe={selectedRecipe}
            recipeInstructions={recipeInstructions}
            setHideRecipeDetails={setHideRecipeDetails}
            setUserSearchedRecipes={setUserSearchedRecipes}
          />
        )}
      </BlobsContainer>
    </Container>
  );
};
export default MainContainer;
