import React from "react";
import styled from "styled-components";

const SearchBar = () => {
  const SearchContainer = styled.div`
    width: 340px;
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
  `;

  const Input = styled.input`
    height: 40px;
    width: 280px;
    padding: 10px;
    font-size: 16px;
    color: #ccc;
    border-radius: 15px;
    border: none;
    ::placeholder,
    ::-webkit-input-placeholder {
      font-weight: bold;
    }
    :-ms-input-placeholder {
      font-weight: bold;
    }
  `;

  const AddButton = styled.button`
    height: 40px;
    width: 40px;
    border-radius: 15px;
    color: black;
    background-color: white;
    border: none;
  `;

  const Plus = styled.img`
    height: 15px;
    width: 15px;
  `;

  return (
    <SearchContainer>
      <Input
        type="text"
        placeholder="What do you have?...garlic, salmon..."
      />
      <AddButton>
        <Plus src="plus.svg" />
      </AddButton>
    </SearchContainer>
  );
};

export default SearchBar;
