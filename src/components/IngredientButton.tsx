import React, { FC } from "react";
import styled from "styled-components";
import { ISelectableIngredients } from "../interfaces/Recipe";

const IngredientBtnStyle = styled.div`
  padding: 10px;
  background-color: #fff;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 15px;
`;

const IngredientName = styled.h1`
  font-size: 16px;
`;

interface IngredientButtonProps {
  key: string;
  ingredientName: string;
}

const IngredientButton: FC<IngredientButtonProps> = ({ ingredientName }) => {
  return (
    <IngredientBtnStyle>
      <IngredientName>{ingredientName}</IngredientName>
    </IngredientBtnStyle>
  );
};

export default IngredientButton;
