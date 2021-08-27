import React, { FC, useState } from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import IngredientButton from './IngredientButton';

const SidebarContainer = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  background-color: #ede6cb;
  padding: 10px;
`;

const LogoContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: blue;
  margin-bottom: 10px;
`;

const PickedIngredients = styled.div`
  width: 100%;
  max-height: 325px;
  margin-top: 10px;
  overflow-y: scroll;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
`;

interface SidebarProps {
  selectedIngredients: string[];
  setSelectedIngredients: Function;
  searchByIngredients: Function;
}


const Sidebar: FC<SidebarProps> = ({
  setSelectedIngredients,
  selectedIngredients,
}) => {
  const [hasIngredient, setHasIngredient] = useState<Boolean>(false);
  

  const renderIngredientsList = () => {
    return selectedIngredients?.map((ingredientName) => (
      <IngredientButton
        key={ingredientName}
        ingredientName={ingredientName}
      ></IngredientButton>
    ));
  };

  console.log(`selectedIngredients`, selectedIngredients)

  return (
    <SidebarContainer>
      <LogoContainer></LogoContainer>
      <SearchBar setSelectedIngredients={setSelectedIngredients} setHasIngredient={setHasIngredient}  selectedIngredients={selectedIngredients}/>
      <PickedIngredients>
      {selectedIngredients.length > 0 ? renderIngredientsList(): null}
        {/* {renderIngredientsList()} */}
      </PickedIngredients>
    </SidebarContainer>
  );
};

export default Sidebar;
