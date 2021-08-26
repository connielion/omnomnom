import React, { useState } from "react";
import Sidebar from "./Sidebar";
import BlobsContainer from "./BlobsContainer";
import styled from "styled-components";
import { topIngredientsList } from "../util/topIngredientsList";
import { ISelectableIngredients } from "../interfaces/Recipe";

interface selectIngredients {
  topIngredientsList: ISelectableIngredients[];
}

const MainContainer = () => {
  const [selectedIngredient, setSelectedIngredient] = useState<
    ISelectableIngredients[]
  >([]);

  const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: lightblue;
    display: grid;
    grid-template-columns: 500px 1fr;
  `;

  console.log(`top ingredients`, topIngredientsList);

  return (
    <Container>
      <Sidebar />
      <BlobsContainer
        topIngredientsList={topIngredientsList}
        setSelectedIngredient={setSelectedIngredient}
      />
    </Container>
  );
};

export default MainContainer;
