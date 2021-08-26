<<<<<<< HEAD
import React, { FC } from "react";
import styled from "styled-components";
import { ISelectableIngredients } from "../interfaces/Recipe";

interface BlobsContainerProps {
  topIngredientsList: ISelectableIngredients[];
  setSelectedIngredient: ISelectableIngredients[];
=======
import React from "react";
import styled from 'styled-components';
import { topIngredientsList } from "../util/topIngredientsList";

const BlobsContainer = () => {
    const BlobsContainer = styled.div`
        grid-area: 1 / 2 / 2 / 3;
        background-color: antiquewhite;
        padding: 10px;

        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 10px;
    `; 

    const Blob = styled.div`
        background-color: red;
    `;

    const renderIngredientBlob = () => {
        const renderBlob = topIngredientsList.map((ingredient) => {
            return (
                <Blob>
                    <h1>{ingredient.name}</h1>
                </Blob>)
        })

        return renderBlob;
    }

    return (
        <BlobsContainer>
            {renderIngredientBlob()}
        </BlobsContainer>)
>>>>>>> dd9d2ff99bd4b6aa28bdef3ca02670963bf21ac4
}

const BlobsContainer: FC<BlobsContainerProps> = ({
  topIngredientsList,
  setSelectedIngredient,
}) => {
  const BlobsContainer = styled.div`
    grid-area: 1 / 2 / 2 / 3;
    background-color: antiquewhite;
    padding: 10px;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 10px;
  `;

  const onSelectIngredient = (ingredient) => {
    return {};
  };

  const Blob = styled.div`
    background-color: red;
  `;

  const renderIngredientBlob = () => {
    const renderBlob = topIngredientsList.map((ingredient) => {
      return (
        <Blob onClick={onSelectIngredient}>
          <h1>{ingredient.name}</h1>
        </Blob>
      );
    });

    return renderBlob;
  };

  return <BlobsContainer>{renderIngredientBlob()}</BlobsContainer>;
};

export default BlobsContainer;
