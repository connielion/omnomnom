import React, {useState, FC} from 'react';
import {IIngredients, IngredientsRequest} from '../interfaces/Recipe';
import styled from 'styled-components';
import PlusIcon from '../assets/plus.svg';
import { timeEnd } from 'console';
import { array } from 'yargs';

interface RecipeCardProps {
    id: number;
    title: string;
    usedIngredients: IIngredients[];
    missedIngredients: IIngredients[];
    image: string;
}

const FoodCard = styled.div`
    background-color: #ef8080;
    border-radius: 15px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
`

const AddBtn = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 15px 0 15px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const TitleContainer = styled.div`
    width: 300px;
    padding-left: 30px;
    text-align: start;
    display: flex;
    flex-wrap: wrap;

    h2 {
        letter-spacing: 1px;
        color: #fff;
    }
`

const UsedIngredientsContainer = styled.div`
    width: 300px;
    padding-left: 30px;
    text-align: start;
    margin-top: 15px;

    h3 {
        color: #fff;
        letter-spacing: 1px;
    }
`

const RecipeCard: FC<RecipeCardProps> = ({id, title, image, usedIngredients,missedIngredients})=> {

    const FoodImage = styled.div`
        width: 50%;
        background-color: #fff;
        background-image: url(${image});
        background-size: cover;
        background-repeat: no-repeat;
        height: 100%;
        position: absolute;
        right: 0;
        clip-path: ellipse(50% 53% at 64% 29%);
    `

    return (
    <FoodCard>

        <AddBtn>
            <img src={PlusIcon} alt="plus" />
        </AddBtn>

        <FoodImage></FoodImage>
        <TitleContainer>
            <h2>{title}</h2>
        </TitleContainer>
        <UsedIngredientsContainer>
            <h3>{missedIngredients.length} Missing Ingredients</h3>
        </UsedIngredientsContainer>

    </FoodCard>)
}

export default RecipeCard;