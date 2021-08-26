import React, { FC } from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import { ISelectableIngredients } from "../interfaces/Recipe";

interface SidebarProps {
  selectedIngredients: ISelectableIngredients[];
  setSelectedIngredients: Function;
}
const Sidebar: FC<SidebarProps> = ({
  setSelectedIngredients,
  selectedIngredients,
}) => {
  const SidebarContainer = styled.div`
    grid-area: 1 / 1 / 2 / 2;
    background-color: purple;
  `;

  const renderIngredientsList = () => {
    return selectedIngredients.map((ingredient) => (
      <h1 key={ingredient.name}>{ingredient.name}</h1>
    ));
  };

  return (
    <SidebarContainer>
      <p>Sidebar</p>
      <SearchBar />
      {renderIngredientsList()}
    </SidebarContainer>
  );
};

export default Sidebar;
