import React, {useState, FC, useEffect } from "react";
import styled, { keyframes } from "styled-components";

interface FindRecipesBtnProps {
  searchRecipesOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  selectedIngredients: string[];
}

interface ButtonAnimationProps {
  recipeBtnOn: boolean;
  firstClick: boolean;
}

const btnIn = keyframes`
  from { transform: translateY(115%); }
  to { transform: translateY(0%); }
`

const btnOut = keyframes`
  from { transform: translateY(0%); }
  to { transform: translateY(115%); }
`

const initialStyle = (recipeState:  boolean, firstClickState:  boolean) => {
  let currAnimation = ``;

  if(firstClickState) return recipeState ? btnIn : btnOut;
  
  return currAnimation;
}


const RecipesBtn = styled.button<ButtonAnimationProps>`
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
  transform: translateY(115%);

  animation-name: ${props => initialStyle(props.recipeBtnOn, props.firstClick)};
  animation-duration: 0.7s;
  animation-fill-mode: ${props => props.recipeBtnOn ? `forwards` : `backwards`};
  animation-iteration-count: 1;

  @media (max-width: 414px) {
    padding: 5px;
  }
`;

const FindRecipesBtn: FC<FindRecipesBtnProps> = ({ searchRecipesOnClick, selectedIngredients }) => {

  const [recipeBtnOn, setRecipeBtnOn] = useState(false);
  const [firstClick, setFirstClick] = useState(false);

  const isThereStuff = () => {
    if(selectedIngredients.length > 0) {
      setRecipeBtnOn(true);
      setFirstClick(true);
    } else {
      setRecipeBtnOn(false);
    }
  }

  useEffect(() => {
    isThereStuff();
    // eslint-disable-next-line
  }, [selectedIngredients]);


  return (
    <RecipesBtn recipeBtnOn={recipeBtnOn} firstClick={firstClick} onClick={(e) => {searchRecipesOnClick(e)
      setRecipeBtnOn(false);
    }}>
      <h2>Find Recipes</h2>
    </RecipesBtn>
  );
};

export default FindRecipesBtn;
