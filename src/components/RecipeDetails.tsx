import React, { FC } from "react";
import {
  IInstructions,
  IInstructionsIngredients,
  ISteps,
  IEquipment,
} from "../interfaces/Recipe";
import { v4 as uuidv4 } from 'uuid';

interface RecipeDetailsProps {
  recipeInstructions: IInstructions[];
  selectedRecipeImage: string;
}

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

  return (
    <>
      <p>RECIPE DETAILS</p>
      <img src={selectedRecipeImage} alt="recipe" />
      <ul>{steps}</ul>
    </>
  );
};

export default RecipeDetails;
