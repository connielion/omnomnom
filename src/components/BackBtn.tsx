import React, { FC } from "react";
import styled from "styled-components";

interface BackBtnProps {
    setDisplayBlobs: Function;
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
`;

const BackBtn: FC<BackBtnProps> = ({ setDisplayBlobs, setUserSearchedRecipes}) => {
  return (
    <Button onClick={()=>{
        setDisplayBlobs(true);
        setUserSearchedRecipes(false);
    }}>
      <h2>Back</h2>
    </Button>
  );
};
export default BackBtn;