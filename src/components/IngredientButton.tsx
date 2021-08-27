import React, {FC} from "react";
import styled from "styled-components";
import { ISelectableIngredients } from "../interfaces/Recipe";

const IngredientBtnStyle = styled.div`
padding: 10px;
background-color: #fff;
margin-right: 5px;
margin-bottom: 5px;
border-radius: 15px;
`

const IngredientName = styled.h1`
font-size: 16px;
`

interface IngredientButtonProps {
    key: string;
    ingredient: ISelectableIngredients;
}

const IngredientButton: FC<IngredientButtonProps> = ({ingredient}) => {

    return (
        <IngredientBtnStyle>
            <IngredientName>{ingredient.name}</IngredientName>
        </IngredientBtnStyle>
    )      
}

export default IngredientButton;