import React, { FC } from "react";
import styled from "styled-components";

const IngredientBtnStyle = styled.div`
  padding: 10px;
  background-color: #fff;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 15px;
  display: flex;
  flex-wrap: no-wrap;
  align-items: center;
`;

const IngredientName = styled.h1`
  font-size: 16px;
`;

const RemoveBtn = styled.img`
  height: 10px;
  width: auto;
  margin-left: 8px;
  margin-top: 3px;
  cursor: pointer;
`;

interface IngredientButtonProps {
  key: string;
  ingredientName: string;
  removeIngredient: Function;
}

const IngredientButton: FC<IngredientButtonProps> = ({
  ingredientName,
  removeIngredient,
}) => {
  return (
    <>
      <IngredientBtnStyle>
        <IngredientName>{ingredientName}</IngredientName>
        <RemoveBtn
          src="close.svg"
          onClick={() => removeIngredient(ingredientName)}
        ></RemoveBtn>
      </IngredientBtnStyle>
    </>
  );
};

export default IngredientButton;
