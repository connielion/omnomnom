import React, {FC} from 'react';
import {IIngredients} from '../interfaces/Recipe';

interface RecipeCardProps {
    id: number;
    title: string;
    usedIngredients: IIngredients[];
    missedIngredients: IIngredients[];
    image: string;
}
const RecipeCard: FC<RecipeCardProps> = ({id, title, image, usedIngredients,missedIngredients})=> {
    return (<div>
        <h1>{title}</h1>
        <img src={image} alt={`${title}`}/>
    </div>)
}

export default RecipeCard;