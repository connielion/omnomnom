import React, { useState, SetStateAction } from "react";
import Sidebar from "./Sidebar";
import BlobsContainer from "./BlobsContainer";
import styled from "styled-components";
import { topIngredientsList } from "../util/topIngredientsList";
import { ISelectableIngredients } from "../interfaces/Recipe";
import { selectCount } from "../features/counter/counterSlice";

const MainContainer = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<
    ISelectableIngredients[]
  >([]);

  const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: lightblue;
    display: grid;
    grid-template-columns: 350px 1fr;
  `;

  return (
    <Container>
      <Sidebar
        setSelectedIngredients={setSelectedIngredients}
        selectedIngredients={selectedIngredients}
      />
      <BlobsContainer
        topIngredientsList={topIngredientsList}
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
      />
    </Container>
  );
};

export default MainContainer;
