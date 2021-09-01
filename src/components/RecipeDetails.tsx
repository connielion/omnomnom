import React, { FC } from "react";
import {
  IInstructions,
  IInstructionsIngredients,
  ISteps,
  IEquipment,
  IRecipe,
} from "../interfaces/Recipe";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import PlusIcon from "../assets/plus.svg";

interface RecipeDetailsProps {
  recipeInstructions: IInstructions[];
  selectedRecipe: IRecipe[];
}

interface ImageProps {
  image: string;
}

const FoodImage = styled.div<ImageProps>`
width: 500px;
background-color: #fff;
background-image:  ${props =>`url(${props.image})`};
background-size: cover;
background-repeat: no-repeat;
background-position: center;
border-radius: 50%;
height: 500px;
position: absolute;
right: 0;
transform: translateX(15%) translateY(-15%);
`;

const RecipeDetailsCard = styled.div`
  background-color: #ef8080;
  border-radius: 15px;
  position: relative;
  padding-left: 70px;
  overflow: hidden;
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

const RecipeInfo = styled.div`
  width: 550px;
  height: 500px;
  margin-top: 100px;
  text-align: start;
  color: #fff;

  h2 {
    letter-spacing: 1px;
  }

  h3 {
    margin-top: 15px;
    letter-spacing: 1px;
  }
`;

const MissingContainer = styled.div`
  display: flex;

  h4 {
    margin-top: 10px;
    margin-bottom: 10px;
    letter-spacing: 1px;
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
`;

const BtnContainer = styled.div`
  margin-top: 25px;
`;

const AddRecipeBtn = styled.button`
  padding: 10px;
  border: 1px solid #fff;
  border-radius: 15px;
  color: #000;
  letter-spacing: 1px;
`;

const CloseRecipeBtn = styled.button`
  padding: 10px;
  border: 1px solid #fff;
  border-radius: 15px;
  background-color: transparent;
  color: #fff;
  margin-left: 10px;
  letter-spacing: 1px;
`;

const RecipeDetails: FC<RecipeDetailsProps> = ({
  recipeInstructions,
  selectedRecipe,
}) => {


  const missedIngredientsMap = () => {
    const missingIngredients = selectedRecipe[0].missedIngredients.map(
      (ingredient, index) => {
        return <h4>{(index ? ", " : "") + ingredient.name}</h4>;
      }
    );

    return missingIngredients;
  };

  const stepsP = recipeInstructions[0]?.steps?.map((stepObject, index) => {
    return (
      <p>
        ({index + 1}) {stepObject.step}
      </p>
    );
  });

  return (
    <RecipeDetailsCard>
      <FoodImage image={selectedRecipe[0].image}>
      </FoodImage>

      <AddBtn>
        <img src={PlusIcon} alt="plus" />
      </AddBtn>

      <RecipeInfo>
        <h2>{selectedRecipe[0].title}</h2>
        <h3>Missing Ingredients:</h3>
        <MissingContainer>{missedIngredientsMap()}</MissingContainer>

        <StepsContainer>{stepsP}</StepsContainer>

        <BtnContainer>
          <AddRecipeBtn>Add to List</AddRecipeBtn>
          <CloseRecipeBtn>Close</CloseRecipeBtn>
        </BtnContainer>
      </RecipeInfo>
    </RecipeDetailsCard>
  );
};

export default RecipeDetails;
