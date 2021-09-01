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
  cursor: pointer;
`;

const Plus = styled.img`
  height: 15px;
  width: 15px;
`;

const SearchBar: FC<SearchBarProps> = ({
  selectedIngredients,
  setSelectedIngredients,
  setUserSearchedRecipes,
}) => {
  const [searchString, setSearchString] = useState<String>(""); // single ingredient name

  // define function for getting searchInput: setIngredientsInput(e.target.value)
  const addIngredientNameToList = () => {
    if (searchString !== "") {
      let searchStringFound: Boolean = false;

      topIngredientsList.forEach((ingredient) => {
        if (ingredient.name === searchString) searchStringFound = true;
      });
      if (searchStringFound === false) {
        setSelectedIngredients((prevState: string[]) => [
          ...prevState,
          searchString,
        ]);
      }
    }
  };

  const enterSubmit = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && searchString !== "") {
      // if any string in topIngredientsList[] has search bar value, setSelectedIngredints
      addIngredientNameToList();
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (target) setSearchString(target.value);
  };

  return (
    <SearchContainer>
      <Input
        type="text"
        placeholder="Enter an ingredient..."
        onKeyPress={enterSubmit}
        onChange={handleSearchChange}
      />
      <AddButton onClick={addIngredientNameToList}>
        <Plus src="plus.svg" />
      </AddButton>
    </SearchContainer>
  );
};

export default SearchBar;
