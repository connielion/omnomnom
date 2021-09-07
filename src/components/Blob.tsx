import React, { useState, FC, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import ingredientBlob from "../assets/blob.svg";

const blobTransition = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

const BlobContent = styled.div`
  background-image: url(${ingredientBlob});
  background-size: 120%;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  // border: black solid 1px;

  @media (min-width: 1535px) {
    background-size: 100%;
  }

  @media (min-width: 1755px) {
    background-size: 90%;
  }

  @media (min-width: 1920px) {
    background-size: 100%;
  }

  @media (min-width: 2120px) {
    background-size: 90%;
  }

  @media (min-width: 2315px) {
    background-size: 82%;
  }

  opacity: 0;
  animation-name: ${blobTransition};
  animation-duration: 2.5s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
`;
const IngredientName = styled.h1`
  font-size: 24px;
  color: #fff;
  letter-spacing: 1px;
  cursor: pointer;
  //tablet
  @media (max-width: 1024px) {
    font-size: 20px;
    line-height: 24px;
  }

  @media (max-width: 860px) {
    font-size: 18px;
    line-height: 20px;
  }

  @media (max-width: 414px) {
    font-size: 20px;
    line-height: 28px;
  }
  @media (max-width: 375px), and (max-height: 812px) {
    font-size: 16px;
    line-height: 20px;
  }

  @media (max-width: 320px), and (max-height: 568px) {
    font-size: 16px;
    line-height: 16px;
  }
`;

const H1Container = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

interface BlobProps {
  ingredientName: string;
  addIngredient: Function;
  selectedIngredients: string[];
}

interface BlobInitialProps {
  blobClicked: Boolean;
}

const blobIn = keyframes`
from {
    transform: scaleY(0) scaleX(0);
    opacity: 0;
}
to {
  transform: scaleY(1) scaleX(1);
  opacity: 1;
}
`;

const BlobInitial = styled.div<BlobInitialProps>`
  position: absolute;
  z-index: 10;
  background-color: #ef8080;
  width: 100%;
  height: 100%;
  transform: scaleY(0.1) scaleX(0.1);
  border-radius: 15px;
  opacity: 0;
  animation-name: ${(props) => (props.blobClicked ? blobIn : ``)};
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
`;

const Blob: FC<BlobProps> = ({
  ingredientName,
  addIngredient,
  selectedIngredients,
}) => {
  const [blobClicked, setBlobClicked] = useState<Boolean>(false);

  useEffect(() => {
    setBlobClicked(selectedIngredients.includes(ingredientName));

    // eslint-disable-next-line
  }, [selectedIngredients]);

  return (
    <BlobContent
      onClick={() => {
        addIngredient(ingredientName);
        setBlobClicked(true);
      }}
    >
      <BlobInitial blobClicked={blobClicked}></BlobInitial>
      <H1Container>
        <IngredientName>{ingredientName}</IngredientName>
      </H1Container>
    </BlobContent>
  );
};

export default Blob;
