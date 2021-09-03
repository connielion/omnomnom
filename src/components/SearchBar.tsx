import React, { useState, FC } from "react";
import styled from "styled-components";
import { topIngredientsList } from "../util/topIngredientsList";

interface SearchBarProps {
  setSelectedIngredients: Function;
  setUserSearchedRecipes: Function;
  selectedIngredients: string[];
}

const SearchContainer = styled.div`
  width: 340px;
  display: flex;
  justify-content: space-around;
  margin: 0 auto;

  @media (max-width: 414px) {
    margin-top: 10px;
  }
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
    opacity: 0.5;
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
  margin: 0 auto;
  cursor: pointer;
`;

const Plus = styled.img`
  margin-top: 6px;
  height: 15px;
  width: 15px;
`;

const SearchBar: FC<SearchBarProps> = ({
  setSelectedIngredients,
  selectedIngredients
}) => {
  const [searchString, setSearchString] = useState<string>(""); // single ingredient name

  const clearText = () => {
    setSearchString("");
  };

 
  const addIngredientNameToList = () => {
    if(searchString !== ""){
      if(!selectedIngredients.includes(searchString.toLowerCase())){
        setSelectedIngredients((prevState: string[]) => [
          ...prevState,
          searchString.toLowerCase(),
        ]);
        clearText();
      }
    }
  };

  const enterSubmit = (event: React.KeyboardEvent) => {
    // if any object in topIngredientsList[] has name that equals to search bar value(lowercased searchString), setSelectedIngredints
    const searchInputIsValid = topIngredientsList.filter(ingredient=>ingredient.name===searchString.toLowerCase()).length > 0;
    if (event.key === "Enter" && searchString !== "" && searchInputIsValid) {
      addIngredientNameToList();
      clearText();
    }
  };

  return (
    <SearchContainer>
      <Input
        type="text"
        value={searchString}
        placeholder="Enter an ingredient..."
        onKeyPress={(e)=>{
          enterSubmit(e);
        }}
        onChange={(e)=>{setSearchString(e.target.value)}}
      />
      <AddButton onClick={addIngredientNameToList}>
        <Plus src="plus.svg" />
      </AddButton>
    </SearchContainer>
  );
};

export default SearchBar;
