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

const SideBarHeadings = styled.h2`
  text-align: start;
  margin-top: 25px;
  margin-left: 2px;
  font-size: 18px;
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

const LogoBackground = styled.div`
  height: 50px;
  width: 50px;
  background-image: url(${BackgroundTexture});
  position: absolute;
  left: 0;
  z-index: 1;
  transform: translateX(-1%);
`;

const LogoImage = styled.img`
  height: 50px;
  width: 54px;
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
  removeIngredient: Function;
}

const RecipeListContainer = styled.div`
  width: 100%;
`;

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
  cursor: pointer;

  img {
    height: 40%;
    cursor: pointer;
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
  setHideRecipeDetails,
  setSelectedRecipes,
  removeIngredient
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
      const characterCheck =
        recipe.title.length <= 28
          ? recipe.title
          : recipe.title.slice(0, 28) + "...";

      return (
        <RecipeBtnStyle
          key={recipe.id}
          onClick={() => getRecipeDetails(recipe.id)}
        >
          <RecipeNameContainer>
            <h3>{characterCheck}</h3>
          </RecipeNameContainer>

          <RemoveBtn onClick={(e) => removeRecipe(e, recipe.id)}>
            <img src="close.svg" alt="close-icon" />
          </RemoveBtn>
        </RecipeBtnStyle>
      );
    });
  };

  return (
    <SidebarContainer>
      <LogoContainer>
      <LogoBackground>
        <LogoImage src="nom.gif" alt="logo gif"></LogoImage>
      </LogoBackground>      
        <LogoText>Omnomnom</LogoText>
      </LogoContainer>
      <SearchBar
        setSelectedIngredients={setSelectedIngredients}
        setUserSearchedRecipes={setUserSearchedRecipes}
        selectedIngredients={selectedIngredients}
      />
      <SideBarHeadings>
        {selectedIngredients.length > 0 ? `Selected Ingredients` : null}
      </SideBarHeadings>
      <PickedIngredients>
        {selectedIngredients.length > 0 ? renderIngredientsList() : null}
      </PickedIngredients>

      <SideBarHeadings>
        {selectedRecipes.length > 0 ? `Selected Recipes` : null}
      </SideBarHeadings>
      <PickedRecipes>
        {selectedRecipes.length ? (
          <RecipeListContainer>{renderRecipesList()}</RecipeListContainer>
        ) : null}
      </PickedRecipes>
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
