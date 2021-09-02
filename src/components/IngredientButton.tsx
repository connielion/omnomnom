import React, { FC } from "react";
import styled from "styled-components";

const IngredientBtnStyle = styled.div`
  background-color: #fff;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 15px;
  display: flex;
  height: 35px;
`;



const IngredientNameContainer = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;

  h3 {
    font-size: 14px;
    letter-spacing: 1px;
  }
`;

const RemoveBtn = styled.div`
  background-color: #ef8080;
  height: 100%;
  width: 30px;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  cursor: pointer;

  img {
    height: 40%;
    cursor: pointer;
  }
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
  
      <IngredientBtnStyle>
        <IngredientNameContainer>
          <h3>
            {ingredientName}
          </h3>
        </IngredientNameContainer>
        {/* <RemoveBtn src="close.svg" onClick={()=>removeIngredient(ingredientName)}></RemoveBtn> */}
        <RemoveBtn onClick={()=>removeIngredient(ingredientName)}>
          <img src="close.svg" alt="close-icon" />
        </RemoveBtn>
      </IngredientBtnStyle>
    
  );
};

export default IngredientButton;
