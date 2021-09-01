export interface ITopIngredient {
  id: number;
  name: string;
}

// FIND RECIPE BY INGREDIENTS
export interface IIngredient {
  name: string;
  amount: number;
  unit: string;
  image: string;
}
export interface IRecipe {
  id: number;
  title: string;
  usedIngredients: IIngredient[];
  missedIngredients: IIngredient[];
  image: string;
}

export interface IRecipeRequest {
  ingredients: string;
  number: number;
  apiKey: string;
}

class RecipeRequest implements IRecipeRequest {
  ingredients = "";
  number = 20;
  apiKey = process.env.REACT_APP_API_KEY || "";
  constructor(configOveride?: Partial<IRecipeRequest>) {
    if (configOveride) {
      Object.assign(this, configOveride);
      if (configOveride.ingredients) {
        this.ingredients.trim().replaceAll(", ", ",+");
        this.ingredients = encodeURIComponent(this.ingredients);
      }
    }
  }
}

// fetching recipe instructions
export interface IInstructionsIngredients {
  id: number;
  name: string;
  image: string;
}
// EQUIPMENT INTERFACE
export interface IEquipment {
  id: number;
  name: string;
  image: string;
}
// LENGTH OF RECIPE STEP
export interface IInstructionsLength {
  number: number;
  unit: string;
}

export interface ISteps {
  number: number;
  step: string;
  ingredients: IInstructionsIngredients[];
  equipment: IEquipment[];
  length: IInstructionsLength;
}
// Overall Instructions Interface
export interface IInstructions {
  name: string;
  steps: ISteps[];
}

//Instructions Request 
export interface IInstructionRequest {
  id: number;
  apiKey: string;
}
class InstructionsRequest implements IInstructionRequest {
  id = 0;
  apiKey = process.env.REACT_APP_API_KEY || "";
  constructor(configOveride?: Partial<IInstructionRequest>) {
    if (configOveride) {
      Object.assign(this, configOveride);
    }
  }
}

// exporting all Request classes
export { RecipeRequest, InstructionsRequest };
