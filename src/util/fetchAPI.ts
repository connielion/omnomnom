import { IRecipe, IRecipeRequest, IInstructionRequest, IIngredientsRequest, ISelectableIngredients, IInstructions } from '../interfaces/Recipe';
const baseUrl = "https://api.spoonacular.com/";
// Fetch recipes by ingredients user typed
export const searchRecipes = async (request: IRecipeRequest): Promise<IRecipe[]> => {
  try {
    const recipes = await fetch(`${baseUrl}recipes/findByIngredients?ingredients=${request.ingredients}&number=${request.number}&apiKey=${request.apiKey}`)
      .then((res) => res.json())
      .then((data) => data);
    return recipes;
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const searchInstructions = async (request: IInstructionRequest): Promise<IInstructions[]> => {
  try {
    const steps = await fetch(`${baseUrl}/recipes/${request.id}/analyzedInstructions?apiKey=${request.apiKey}`)
      .then(res=>res.json())
      .then(data=>data);
    return steps;
  } catch(error){
    console.error(error);
    return [];
  }
}
export const fetchAllIngredients = async (request: IIngredientsRequest): Promise<ISelectableIngredients[]> => {
    try {
        const ingredients = await fetch(`${baseUrl}food/ingredients/search?query=${request.query}&number=100&apiKey=${request.apiKey}`)
          .then(res=>res.json())
          .then(data=>data);
        return ingredients;
    } catch(error){
        console.error(error);
        return [];
    }
}