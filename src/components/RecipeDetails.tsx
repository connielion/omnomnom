import React, { FC } from "react";
import { IInstructions, IRecipe } from "../interfaces/Recipe";
import styled from "styled-components";
import PlusIcon from "../assets/plus.svg";

interface RecipeDetailsProps {
  recipeInstructions: IInstructions[];
  selectedRecipe: IRecipe[];
  setHideRecipeDetails: Function;
  setUserSearchedRecipes: Function;
  addRecipe: Function;
}

interface ImageProps {
  image: string;
}

const FoodImage = styled.div<ImageProps>`
  width: 500px;
  background-color: #fff;
  background-image: ${(props) => `url(${props.image})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 50%;
  height: 500px;
  position: absolute;
  right: 0;
  transform: translateX(15%) translateY(-15%);

  @media (max-width: 414px) {
    width: 500px;
    transform: translateX(10%) translateY(-40%);
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      ${(props) => `url(${props.image})`};
  }

  @media (max-width: 375px) {
    transform: translateX(12%) translateY(-40%);
  }
`;

const RecipeDetailsCard = styled.div`
  background-color: #ef8080;
  border-radius: 15px;
  position: relative;
  padding-left: 70px;
  overflow: hidden;

  @media (max-width: 414px) {
    overflow-y: scroll;
    width: 105%;
    position: relative;
    right: 10px;
    bottom: 10px;
    border-radius: 0 0 15px 15px;
  }

  @media (max-width: 375px) {
    width: 106%;
  }
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

  @media (max-width: 414px) {
    border-radius: 0 0 15px 0;
  }
`;

const RecipeInfo = styled.div`
  width: 550px;
  height: 500px;
  margin-top: 100px;
  text-align: start;
  color: #fff;

  h2 {
    letter-spacing: 1px;
    font-size: 38px;
  }

  h3 {
    margin-top: 15px;
    letter-spacing: 1px;
  }

  @media (max-width: 414px) {
    width: 375px;
    margin-left: -50px;
    height: auto;

    h2 {
      position: relative;
      z-index: 10;
      text-align: center;
      height: 190px;
      line-height: 50px;
    }

    h3 {
      margin-top: 20px;
    }
  }

  @media (max-width: 375px) {
    width: 333px;
  }
`;

const MissingContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: no-wrap;
  overflow: auto;
  width: 100%;
  margin-top: 10px;
`;

const MissingIngredientsBtn = styled.div`
  padding: 10px;
  background-color: transparent;
  border: 1px solid #fff;
  margin-right: 5px;
  border-radius: 15px;
  display: flex;
  flex-wrap: nowrap;

  h4 {
    color: #fff;
    letter-spacing: 1px;
    white-space: nowrap;
  }

  @media (max-width: 414px) {
    padding: 5px;
    margin-bottom: 10px;
  }
`;

const StepsContainer = styled.div`
  width: 100%;
  max-height: 400px;
  overflow: auto;

  p {
    margin-top: 15px;
    letter-spacing: 1px;
    line-height: 22px;
  }

  @media (max-width: 414px) {
    max-height: none;
    overflow: visible;
  }
`;

const BtnContainer = styled.div`
  margin-top: 25px;

  @media (max-width: 414px) {
    position: absolute;
    left: 20px;
  }
`;

const AddRecipeBtn = styled.button`
  padding: 10px;
  border: 1px solid #fff;
  border-radius: 15px;
  color: #ef8080;
  letter-spacing: 1px;
  cursor: pointer;

  @media (max-width: 414px) {
    margin-bottom: 20px;
  }
`;

const CloseRecipeBtn = styled.button`
  padding: 10px;
  border: 1px solid #fff;
  border-radius: 15px;
  background-color: transparent;
  color: #fff;
  margin-left: 10px;
  letter-spacing: 1px;
  cursor: pointer;
`;

const RecipeDetails: FC<RecipeDetailsProps> = ({
  recipeInstructions,
  selectedRecipe,
  setHideRecipeDetails,
  setUserSearchedRecipes,
  addRecipe,
}) => {
  const missedIngredientsMap = () => {
    const missingIngredients = selectedRecipe[0].missedIngredients.map(
      (ingredient) => {
        return (
          <MissingIngredientsBtn key={ingredient.name}>
            <h4>{ingredient.name}</h4>
          </MissingIngredientsBtn>
        );
      }
    );

    return missingIngredients;
  };

  const stepsP = recipeInstructions[0]?.steps?.map((stepObject, index) => {
    return (
      <p key={index}>
        ({index + 1}) {stepObject.step}
      </p>
    );
  });

  const closeRecipeDetails = () => {
    setHideRecipeDetails(true);
    setUserSearchedRecipes(true);
  };

  return (
    <RecipeDetailsCard>
      <FoodImage image={selectedRecipe[0].image}></FoodImage>

      <AddBtn onClick={(e) => addRecipe(e, selectedRecipe[0])}>
        <img src={PlusIcon} alt="plus" />
      </AddBtn>

      <RecipeInfo>
        <h2>{selectedRecipe[0].title}</h2>
        <h3>Missing Ingredients:</h3>
        <MissingContainer>{missedIngredientsMap()}</MissingContainer>

        <StepsContainer>
          {recipeInstructions.length ? (
            stepsP
          ) : (
            <p>"Uh-oh. Instructions are not available."</p>
          )}
        </StepsContainer>

        <BtnContainer>
          <AddRecipeBtn onClick={(e) => addRecipe(e, selectedRecipe[0])}>
            Add to List
          </AddRecipeBtn>
          <CloseRecipeBtn onClick={closeRecipeDetails}>Close</CloseRecipeBtn>
        </BtnContainer>
      </RecipeInfo>
    </RecipeDetailsCard>
  );
};

export default RecipeDetails;
