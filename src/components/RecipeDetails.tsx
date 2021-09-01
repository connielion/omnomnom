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

const RecipeDetailsCard = styled.div`
  background-color: #ef8080;
  border-radius: 15px;
  position: relative;
  padding-left: 70px;
  overflow: hidden;
`;

const RecipeDetails: FC<RecipeDetailsProps> = ({
  recipeInstructions,
  selectedRecipe,
}) => {
  const displayStepsInfo = (steps: ISteps[]) => {
    return steps.map((stepObject) => {
      const { number, step, ingredients, equipment, length } = stepObject;
      return (
        <div key={uuidv4()}>
          <h2>{`Step ${number}`}:</h2>
          <p>{`${step}`}</p>
          <ul>
            {ingredients?.map((ingredient: IInstructionsIngredients) => (
              <li key={uuidv4()}>{ingredient.name}</li>
            ))}
          </ul>
          <div>
            <h3>Equipments</h3>
            {equipment?.map((equipmentObject: IEquipment) => (
              <p key={equipmentObject.id}>{equipmentObject.name}</p>
            ))}
          </div>
          <p>{length ? `${length.number} ${length.unit}` : null}</p>
        </div>
      );
    });
  };

  const steps = recipeInstructions.map((instructionObject, i) => {
    const { name, steps } = instructionObject;
    return (
      <div key={i}>
        <p>{name?.length > 0 && name}</p>
        <>{displayStepsInfo(steps)}</>
      </div>
    );
  });


  const FoodImage = styled.div`
    width: 500px;
    background-color: #fff;
    background-image: url(${selectedRecipe[0].image});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 50%;
    height: 500px;
    position: absolute;
    right: 0;
    transform: translateX(15%) translateY(-15%);
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
    margin-top: 70px;
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
    height: 300px;
    overflow: auto;

    p {
      margin-top: 15px;
      letter-spacing: 1px;
    }
  `;

  const missedIngredientsMap = () => {
    const missingIngredients = selectedRecipe[0].missedIngredients.map(
      (ingredient, index) => {
        return <h4>{(index ? ", " : "") + ingredient.name}</h4>;
      }
    );

    return missingIngredients;
  };


    const stepsP = recipeInstructions[0]?.steps?.map((stepObject, index) => {
      return  <p>({index+1}) {stepObject.step}</p>
    });

  return (
    <RecipeDetailsCard>
      <FoodImage></FoodImage>

      <AddBtn>
        <img src={PlusIcon} alt="plus" />
      </AddBtn>

      <RecipeInfo>
        <h2>{selectedRecipe[0].title}</h2>
        <h3>Missing Ingredients:</h3>
        <MissingContainer>
          {missedIngredientsMap()}
        </MissingContainer>

        <StepsContainer>
          {stepsP}
        </StepsContainer>

      </RecipeInfo>

    </RecipeDetailsCard>
  );
};

export default RecipeDetails;
