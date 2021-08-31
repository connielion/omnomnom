import React, { FC } from 'react'
import styled from 'styled-components'
import SearchBar from './SearchBar'
import IngredientButton from './IngredientButton'
import FindRecipesBtn from './FindRecipesBtn';
import {IRecipe} from '../interfaces/Recipe'
import BackBtn from './BackBtn';

const SidebarContainer = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  background-color: #ede6cb;
  padding: 10px;
  position: relative;
`

const LogoContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: blue;
  margin-bottom: 10px;
`

const PickedIngredients = styled.div`
  width: 100%;
  max-height: 325px;
  margin-top: 10px;
  overflow-y: scroll;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
`

const RecipeBtn = styled.div`
  padding: 10px;
  background-color: #fff;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 15px;
  `

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
}

const Sidebar: FC<SidebarProps> = ({
  setSelectedIngredients,
  selectedIngredients,
  selectedRecipes,
  searchByIngredients,
  setSearchedRecipes,
  setUserSearchedRecipes,
  getRecipeDetails,
  userSearchedRecipes,
  renderBlobs,
  setDisplayBlobs,
}) => {
  
  const searchRecipesOnClick = async () => {
    if (selectedIngredients.length > 0) {
      setUserSearchedRecipes(true);
      const recipesList = await searchByIngredients(selectedIngredients.join(','));
      setSearchedRecipes(recipesList);
      setSelectedIngredients([]);
    }
  }

  const renderIngredientsList = () => {
    return selectedIngredients?.map((ingredientName) => (
      <IngredientButton
        key={ingredientName}
        ingredientName={ingredientName}
      ></IngredientButton>
    ))
  }

  //onclick to getRecipeDetails to listed recipes in sidebar
  const renderRecipesList = () => {
    return selectedRecipes?.map((recipe) => {
      return <RecipeBtn
        key={recipe.id}
        onClick={()=>getRecipeDetails(recipe.id)}
        ><h2>{recipe.title}</h2>
      </RecipeBtn>
    })
  }

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
        {selectedRecipes.length ? (<><h2>Saved Recipes</h2>{renderRecipesList()}</>): null}
      </PickedIngredients>
      {!userSearchedRecipes ? <FindRecipesBtn searchRecipesOnClick={searchRecipesOnClick} /> : <BackBtn setDisplayBlobs={setDisplayBlobs} setUserSearchedRecipes={setUserSearchedRecipes}/> }
    </SidebarContainer>
  )
}

export default Sidebar
