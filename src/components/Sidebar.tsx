import React, { FC } from "react";
import styled, { keyframes } from "styled-components";
import SearchBar from "./SearchBar";
import IngredientButton from "./IngredientButton";
import FindRecipesBtn from "./FindRecipesBtn";
import { IRecipe } from "../interfaces/Recipe";
import BackBtn from "./BackBtn";
import BackgroundTexture from "../assets/bgTexture.svg";

const SidebarContainer = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  background-image: url(${BackgroundTexture});
  background-repeat: no-repeat;
  background-size: cover;
  padding: 10px;
  position: relative;
  box-shadow: 1px 0 15px 1px #ef80803f;
`;

const LogoContainer = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  overflow: hidden;
  position: relative;
`;

const LogoImage = styled.img`
  height: 50px;
  width: 50px;
  position: absolute;
  left: 0;
  z-index: 2;
  transform: translateX(0.5%);
`;

// to: how far text should go into gif
const slideLeft = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-120%);
  }
`;

const LogoText = styled.h1`
  position: absolute;
  left: 20%;
  animation-name: ${slideLeft};
  animation-duration: 7s;
  animation-iteration-count: infinite;
  transform: translateX(100%);
  z-index: 0;
`;

const PickedIngredients = styled.div`
  width: 100%;
  max-height: 325px;
  margin-top: 10px;
  overflow-y: scroll;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const RecipeBtn = styled.div`
  padding: 10px;
  background-color: #fff;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 15px;
  display: flex;
  align-items: center;
`;

interface SidebarProps {
  selectedIngredients: string[];
  setSelectedIngredients: Function;
  searchByIngredients: Function;
  setSearchedRecipes: Function;
  setUserSearchedRecipes: Function;
  selectedRecipes: IRecipe[];
  getRecipeDetails: Function;
  userSearchedRecipes: Boolean;
  renderIngredientBlobs: Function;
  setHideRecipeDetails: Function;
  setSelectedRecipes: Function;
}

const RemoveRecipeBtn = styled.img`
  height: 10px;
  width: auto;
  margin-left: 8px;
  margin-top: 3px;
`;

const Sidebar: FC<SidebarProps> = ({
  setSelectedIngredients,
  selectedIngredients,
  selectedRecipes,
  searchByIngredients,
  setSearchedRecipes,
  setUserSearchedRecipes,
  getRecipeDetails,
  userSearchedRecipes,
  setHideRecipeDetails,
  setSelectedRecipes,
}) => {

  const searchRecipesOnClick = async () => {
    if (selectedIngredients.length > 0) {
      setUserSearchedRecipes(true);
      const recipesList = await searchByIngredients(
        selectedIngredients.join(",")
      );
      setSearchedRecipes(recipesList);
    }
  };

  const renderIngredientsList = () => {
    return selectedIngredients?.map((ingredientName) => (
      <IngredientButton
        key={ingredientName}
        ingredientName={ingredientName}
        removeIngredient={removeIngredient}
      ></IngredientButton>
    ));
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

  const removeRecipe = (recipeID: number) => {
    if (selectedRecipes.length) {
      const updatedRecipesList = selectedRecipes.filter(
        (recipe) => recipe.id !== recipeID
      );
      setSelectedRecipes(updatedRecipesList);
    }
  };

  // getRecipeDetails: click handler to list recipes in sidebar and fetch recipe details by recipeID
  const renderRecipesList = () => {
    return selectedRecipes?.map((recipe) => {
      return (
        <RecipeBtn key={recipe.id} onClick={() => getRecipeDetails(recipe.id)}>
          <h2>{recipe.title}</h2>
          <RemoveRecipeBtn
            onClick={() => removeRecipe(recipe.id)}
            src="close.svg"
          ></RemoveRecipeBtn>
        </RecipeBtn>
      );
    });
  };

  return (
    <SidebarContainer>
      <LogoContainer>
        <LogoImage src="nom.gif" alt="logo gif"></LogoImage>
        <LogoText>Omnomnom</LogoText>
      </LogoContainer>
      <SearchBar
        setSelectedIngredients={setSelectedIngredients}
        setUserSearchedRecipes={setUserSearchedRecipes}
        selectedIngredients={selectedIngredients}
      />
      <PickedIngredients>
        {selectedIngredients.length > 0 ? renderIngredientsList() : null}
      </PickedIngredients>
      <PickedIngredients>
        {selectedRecipes.length ? (
          <>
            <h2>Saved Recipes</h2>
            {renderRecipesList()}
          </>
        ) : null}
      </PickedIngredients>
      {!userSearchedRecipes ? (
        <FindRecipesBtn searchRecipesOnClick={searchRecipesOnClick} />
      ) : (
        <BackBtn
          setHideRecipeDetails={setHideRecipeDetails}
          setUserSearchedRecipes={setUserSearchedRecipes}
        />
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
