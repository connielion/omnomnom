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

const SideBarHeadings = styled.h2 `
  text-align: start;
    margin-top: 25px;
    margin-left: 2px;
    font-size: 18px;
`

const LogoContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: blue;
  margin-bottom: 10px;
`;

const PickedIngredients = styled.div`
  width: 100%;
  max-height: 225px;
  margin-top: 10px;
  overflow-y: scroll;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const PickedRecipes = styled.div`
  width: 100%;
  max-height: 225px;
  margin-top: 10px;
  overflow-y: scroll;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
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
  renderBlobs: Function;
  setDisplayBlobs: Function;
  setSelectedRecipes: Function;
}

const RecipeListContainer = styled.div`
  width: 100%;
`


const RecipeBtnStyle = styled.div`
  background-color: #fff;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 15px;
  display: flex;
  height: 35px;

  justify-content: space-between;
`;



const RecipeNameContainer = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;

  h3 {
    font-size: 14px;
    letter-spacing: 1px;
    text-align: start;
  }
`;

const RemoveBtn = styled.div`
  background-color: #ef8080;
  height: 100%;
  width: 30px;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;

  img {
    height: 40%;
  }
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
  setDisplayBlobs,
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

      const characterCheck = recipe.title.length <= 28 ? recipe.title : recipe.title.slice(0, 28) + '...';

      return (
  
        <RecipeBtnStyle>
          <RecipeNameContainer>
            <h3>
              {characterCheck}
            </h3>
          </RecipeNameContainer>

          <RemoveBtn onClick={()=>removeRecipe(recipe.id)}>
            <img src="close.svg" alt="close-icon" />
          </RemoveBtn>
        </RecipeBtnStyle>
      
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
      <SideBarHeadings>{selectedIngredients.length > 0 ? `Selected Ingredients` : null}</SideBarHeadings>
      <PickedIngredients>
        {selectedIngredients.length > 0 ? renderIngredientsList() : null}
      </PickedIngredients>

      <SideBarHeadings>{selectedRecipes.length > 0 ? `Selected Recipes` : null}</SideBarHeadings>
      <PickedRecipes>
        {selectedRecipes.length ? (
          <RecipeListContainer>
            {renderRecipesList()}
          </RecipeListContainer>
        ) : null}
      </PickedRecipes>
      {!userSearchedRecipes ? (
        <FindRecipesBtn searchRecipesOnClick={searchRecipesOnClick} />
      ) : (
        <BackBtn
          setDisplayBlobs={setDisplayBlobs}
          setUserSearchedRecipes={setUserSearchedRecipes}
        />
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
