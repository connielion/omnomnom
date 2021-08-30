import React, {FC} from 'react';
import {IIngredients} from '../interfaces/Recipe';

interface RecipeCardProps {
    id: number;
    title: string;
    usedIngredients: IIngredients[];
    missedIngredients: IIngredients[];
    image: string;
    getRecipeDetails: Function
}

const RecipeCard: FC<RecipeCardProps> = ({id, title, image, usedIngredients, missedIngredients, getRecipeDetails})=> {
    return (<div style={{border: '1px solid black'}}  onClick={()=>getRecipeDetails(id)}>
        <h1>{title}</h1>
        <img src={image} alt={`${title}`}/>
    </div>)
}

export default RecipeCard;