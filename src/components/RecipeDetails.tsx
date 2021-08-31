import React, { FC } from "react";
import {
  IInstructions,
  IInstructionsIngredients,
  ISteps,
  IEquipment,
} from "../interfaces/Recipe";
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import PlusIcon from '../assets/plus.svg';

interface RecipeDetailsProps {
  recipeInstructions: IInstructions[];
  selectedRecipeImage: string;
}

const RecipeDetailsCard = styled.div`
  background-color: #ef8080;
  border-radius: 15px;
  position: relative;
  padding-left: 70px;
`

const RecipeDetails: FC<RecipeDetailsProps> = ({
  recipeInstructions,
  selectedRecipeImage,
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
        width: 70%;
        background-color: #fff;
        background-image: url(${selectedRecipeImage});
        background-size: 100%;
        background-repeat: no-repeat;
        height: 100%;
        position: absolute;
        right: 0;
        clip-path: ellipse(50% 45% at 85% 19%);
    `

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
`

    const RecipeInfo = styled.div`
      width: 450px;
      height: 500px;
      background-color: white;
      margin-top: 70px;
    `

  return (
    <RecipeDetailsCard>

      <FoodImage></FoodImage>

      <AddBtn>
      <img src={PlusIcon} alt="plus" />
      </AddBtn>

      <RecipeInfo>
        

      </RecipeInfo>      

    </RecipeDetailsCard>
  );
};

export default RecipeDetails;
