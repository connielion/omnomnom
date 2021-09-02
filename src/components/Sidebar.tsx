import React, { FC } from "react";
import styled from "styled-components";
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
  background-color: blue;
  margin-bottom: 10px;
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
  cursor: pointer;
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
  cursor: pointer;
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

  const removeRecipe = (
    e: React.MouseEvent<HTMLDivElement>,
    recipeID: number
  ) => {
    e.stopPropagation();
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
            onClick={(e) => removeRecipe(e, recipe.id)}
            src="close.svg"
          ></RemoveRecipeBtn>
        </RecipeBtn>
      );
    });
  };

  return (
    <SidebarContainer>
      <LogoContainer></LogoContainer>
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
