import React, { FC } from "react";
import { IRecipe } from "../interfaces/Recipe";
import styled from "styled-components";
import PlusIcon from "../assets/plus.svg";

interface RecipeCardProps {
  recipe: IRecipe;
  getRecipeDetails: Function;
  setSelectedRecipes: Function;
  addRecipe: Function;
  selectedRecipes: IRecipe[];
}

const FoodCard = styled.div`
  background-color: #ef8080;
  border-radius: 15px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

const AddBtn = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 15px 0 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled.div`
  width: 300px;
  padding-left: 30px;
  text-align: start;
  display: flex;
  flex-wrap: wrap;

  h2 {
    letter-spacing: 1px;
    color: #fff;
  }
`;

const UsedIngredientsContainer = styled.div`
  width: 300px;
  padding-left: 30px;
  text-align: start;
  margin-top: 15px;

  h3 {
    color: #fff;
    letter-spacing: 1px;
  }
`;

const RecipeCard: FC<RecipeCardProps> = ({
  recipe,
  getRecipeDetails,
  setSelectedRecipes,
  addRecipe,
  selectedRecipes,
}) => {
  const FoodImage = styled.div`
    width: 50%;
    background-color: #fff;
    background-image: url(${recipe.image});
    background-size: cover;
    background-repeat: no-repeat;
    height: 100%;
    position: absolute;
    right: 0;
    clip-path: ellipse(50% 53% at 64% 29%);
  `;

  return (
    <FoodCard onClick={() => getRecipeDetails(recipe.id)}>
      {/* add onclick to button to add to sidebar */}
      <AddBtn onClick={(e) => addRecipe(e, recipe)}>
        <img src={PlusIcon} alt="plus" />
      </AddBtn>
      <FoodImage></FoodImage>
      <TitleContainer>
        <h2>{recipe.title}</h2>
      </TitleContainer>
      <UsedIngredientsContainer>
        <h3>{recipe.missedIngredients.length} Missing Ingredients</h3>
      </UsedIngredientsContainer>
    </FoodCard>
  );
};

export default RecipeCard;
