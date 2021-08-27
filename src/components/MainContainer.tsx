import React, { useState, SetStateAction } from "react";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import Blob from "./Blob";
import { topIngredientsList } from "../util/topIngredientsList";
import { ISelectableIngredients } from "../interfaces/Recipe";
import { selectCount } from "../features/counter/counterSlice";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: lightblue;
  display: grid;
  grid-template-columns: 350px 1fr;
`;

const BlobsContainer = styled.div`
  grid-area: 1 / 2 / 2 / 3;
  background-color: #ebe6da;
  padding: 10px;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 250px;
  grid-gap: 10px;
  overflow: scroll;
`;

const MainContainer = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const renderBlobs = (): JSX.Element[] => {
    const blobs = topIngredientsList.map((ingredientName) => {
      return (
        <Blob
          key={ingredientName}
          ingredientName={ingredientName}
          setSelectedIngredients={setSelectedIngredients}
          selectedIngredients={selectedIngredients}
        />
      );
    });

    return blobs;
  };

  return (
    <Container>
      <Sidebar
        setSelectedIngredients={setSelectedIngredients}
        selectedIngredients={selectedIngredients}
      />
      <BlobsContainer>{renderBlobs()}</BlobsContainer>
    </Container>
  );
};

export default MainContainer;
