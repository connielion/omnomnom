import React, { FC, useState } from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import { ISelectableIngredient } from "../interfaces/Recipe";

interface SidebarProps {
  selectedIngredients: ISelectableIngredient[];
  setSelectedIngredients: Function;
  searchByIngredients: Function;
}

const SidebarContainer = styled.div`
    grid-area: 1 / 1 / 2 / 2;
    background-color: purple;
  `;

const Sidebar: FC<SidebarProps> = ({
  setSelectedIngredients,
  selectedIngredients,
}) => {
  const [hasIngredient, setHasIngredient] = useState<Boolean>(false);
  

  const renderIngredientsList = () => {
    return selectedIngredients?.map((ingredient) => (
      <h1 key={ingredient.name}>{ingredient.name}</h1>
    ));
  };

  return (
    <SidebarContainer>
      <p>Sidebar</p>
      <SearchBar setSelectedIngredients={setSelectedIngredients} selectedIngredients={selectedIngredients} setHasIngredient={setHasIngredient} hasIngredient={hasIngredient}/>
      {renderIngredientsList()}
    </SidebarContainer>
  );
};

export default Sidebar;
