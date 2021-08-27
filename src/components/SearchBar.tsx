import React, {useState, FC} from "react";
import styled from "styled-components";
import { ISelectableIngredient } from '../interfaces/Recipe';
import {topIngredientsList} from '../util/topIngredientsList';

interface SearchBarProps {
    selectedIngredients: ISelectableIngredient[];
    setSelectedIngredients: Function;
    setHasIngredient: Function;
    hasIngredient: Boolean;
  }

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

const SearchBar: FC<SearchBarProps> = ({selectedIngredients ,setSelectedIngredients, setHasIngredient, hasIngredient}) => {
  const [searchString, setSearchString] = useState<String>(''); // single ingredient name 

  // define function for getting searchInput: setIngredientsInput(e.target.value)
  const addIngredientNameToList =()=> {
    console.log(`clicked`)
    if(searchString !== '' && topIngredientsList.some(ingredientObject => Object.values(ingredientObject).indexOf(`${searchString}`) > -1)){
      setHasIngredient(true);
      setSelectedIngredients((prevState: ISelectableIngredient[]) =>[...prevState, searchString]);
    }
  }

  const enterSubmit = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
        // if any {} in topIngredientsList[] has search bar value, setSelectedIngredints 
        if(topIngredientsList.some(ingredientObject => Object.values(ingredientObject).indexOf(`${searchString}`) > -1)){
          setHasIngredient(true);
          setSelectedIngredients((prevState: ISelectableIngredient[]) =>[...prevState, searchString]);
        }
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    console.log(`value`, target.value)
    if(target) setSearchString(target.value);
  };

   console.log(`selected Ing`, selectedIngredients)
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
