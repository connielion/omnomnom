import React, { FC } from "react";
import styled from "styled-components";
import ingredientBlob from "../assets/blob.svg";
import { ISelectableIngredient } from "../interfaces/Recipe";

const BlobContent = styled.div`
    background-image: url(${ingredientBlob});
    background-size: 120%;
    background-repeat: no-repeat;
    background-position: center;

    display: flex;
    justify-content: center;
    align-items: center;
`;
const IngredientName = styled.h1`
    font-size: 24px;
    color: #fff;
    letter-spacing: 1px;
`;

const H1Container = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface BlobProps {
    ingredient: ISelectableIngredient;
    selectedIngredients: ISelectableIngredient[];
    setSelectedIngredients: Function;
}

const Blob: FC<BlobProps> = ({ ingredient, setSelectedIngredients, selectedIngredients }) => {

    return(
        <BlobContent
          onClick={ () => {if (!selectedIngredients.includes(ingredient)) {
            setSelectedIngredients((prevState: ISelectableIngredient[]) => [...prevState, ingredient])
        }}}
        >
          <H1Container>
            <IngredientName>{ingredient.name}</IngredientName>
          </H1Container>
        </BlobContent>
    );

}

export default Blob;