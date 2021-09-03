import React, { FC } from "react";
import styled from "styled-components";

interface BackBtnProps {
  setHideRecipeDetails: Function;
  setUserSearchedRecipes: Function;
}

const Button = styled.button`
  background-color: #fff;
  border: none;
  padding: 10px;
  border-radius: 15px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 95%;
  margin-bottom: 10px;
  margin-left: 2.5%;
  cursor: pointer;

  @media (max-width: 414px) {
    padding: 5px;
  }
`;

const BackBtn: FC<BackBtnProps> = ({
  setHideRecipeDetails,
  setUserSearchedRecipes,
}) => {
  return (
    <Button
      onClick={() => {
        setHideRecipeDetails(true);
        setUserSearchedRecipes(false);
      }}
    >
      <h2>Back to Ingredients</h2>
    </Button>
  );
};
export default BackBtn;
