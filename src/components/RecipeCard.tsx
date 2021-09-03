import React, { FC } from "react";
import { IRecipe } from "../interfaces/Recipe";
import styled, {keyframes} from "styled-components";
import PlusIcon from "../assets/plus.svg";

interface RecipeCardProps {
  recipe: IRecipe;
  getRecipeDetails: Function;
  setSelectedRecipes: Function;
  addRecipe: Function;
  selectedRecipes: IRecipe[];
}

const recipeCardTransition = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

const FoodCard = styled.div`
  background-color: #ef8080;
  border-radius: 15px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  cursor: pointer;
  opacity: 0;
  animation-name: ${recipeCardTransition};
  animation-duration: 2.5s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
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
  cursor: pointer;
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

  @media (min-width: 1925px) {
    width: 220px;
  }

  @media (max-width: 1405px) {
    width: 200px;
  }

  @media (max-width: 1024px) {
      width: 188px;
      margin-top: 45px;
      padding-left: 20px;

  }

  @media (max-width: 414px) {
    width: 225px;
    padding-left: 20px;
  }
  h2 {
    line-height: 30px;
  }

  @media (max-width: 375px) {
    width: 202px;
    margin-top: 15px;
  }

  h2 {
    line-height: 27px;
  }

  @media (max-width: 320px) {
    width: 190px;
    padding-left: 15px;
    margin-top: 35px;
  }
  h2 {
    font-size: 22px;
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

  @media (max-width: 1108px) {
    h3 {
        width: 180px;
    }
  }

  @media (max-width: 1024px) {
      h3 {
          font-size: 1.1rem;
      }
  }

  @media (max-width: 414px) {
    width: 250px;
    padding-left: 20px;
  }

  @media (max-width: 320px) {
    width: 220px;
    padding-left: 15px;
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
    width: 40%;
    background-color: #fff;
    background-image: url(${recipe.image});
    background-size: cover;
    background-repeat: no-repeat;
    height: 70%;
    position: absolute;
    border-top-right-radius: 15px;
    border-bottom-left-radius: 15px;
    top: 0;
    right: 0;
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
