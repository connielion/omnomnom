import React from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
`;

const Input = styled.input`
height: 40px;
width: 85%;
padding: 10px;
font-size: 16px;
color: #ccc;
border-radius: 15px;
border: none;
::placeholder,
::-webkit-input-placeholder {
  opacity: 0.5
}
:-ms-input-placeholder {
  font-weight: bold;
}
`;

const AddButton = styled.button`
height: 40px;
width: 40px;
border-radius: 15px;
background-color: #fff;
border: none;
`;

const Plus = styled.img`
height: 15px;
width: 15px;
`;

const SearchBar = () => {

  return (
    <SearchContainer>
      <Input
        type="text"
        placeholder="Search Ingredients"
      />
      <AddButton>
        <Plus src="plus.svg" />
      </AddButton>
    </SearchContainer>
  );
};

export default SearchBar;
