import React, { FC } from "react";
import styled from "styled-components";
import ingredientBlob from "../assets/blob.svg";

const BlobContent = styled.div`
  background-image: url(${ingredientBlob});
  background-size: 120%;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const IngredientName = styled.h1`
  font-size: 24px;
  color: #fff;
  letter-spacing: 1px;
  cursor: pointer;
`;

const H1Container = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface BlobProps {
  ingredientName: string;
  addIngredient: Function;
}

const Blob: FC<BlobProps> = ({ ingredientName, addIngredient }) => {
  return (
    <BlobContent onClick={() => addIngredient(ingredientName)}>
      <H1Container>
        <IngredientName>{ingredientName}</IngredientName>
      </H1Container>
    </BlobContent>
  );
};

export default Blob;
