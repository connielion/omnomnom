export interface ITopIngredient {
  id: number;
  name: string;
}

// FIND RECIPE BY INGREDIENTS
export interface IIngredients {
  name: string;
  amount: number;
  unit: string;
  image: string;
}
export interface IRecipe {
  id: number;
  title: string;
  usedIngredients: IIngredients[];
  missedIngredients: IIngredients[];
  image: string;
}
export interface IRecipeRequest {
  ingredients: string; // garlic, salmon, pepper
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

// RECIPE INGREDIENTS INTERFACE - fetching recipe instructions
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

//Instructions Request Class
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

// Ingredients list interface
export interface ISelectableIngredient {
  name: string;
}
// Request Interface for selectable ingredients fetch
export interface IIngredientsRequest {
  query: string;
  number: number;
  apiKey: string;
}
class IngredientsRequest implements IIngredientsRequest {
  query = "";
  number = 20;
  apiKey = process.env.REACT_APP_API_KEY || "";
  constructor(configOveride?: Partial<IIngredientsRequest>) {
    if (configOveride) {
      Object.assign(this, configOveride);
      if (configOveride.query) {
        this.query = encodeURIComponent(this.query);
      }
    }
  }
}

// exporting all Request classes
export { RecipeRequest, InstructionsRequest, IngredientsRequest };
