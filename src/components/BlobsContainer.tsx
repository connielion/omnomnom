import { render } from "@testing-library/react";
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
}

export default BlobsContainer;