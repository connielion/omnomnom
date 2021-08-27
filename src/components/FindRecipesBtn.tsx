import React from 'react';
import styled from 'styled-components';

const RecipesBtn = styled.button`
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
`

const FindRecipesBtn = () => {
    return (
        <RecipesBtn>
            <h2>Find Recipes</h2>
        </RecipesBtn>
    )
}

export default FindRecipesBtn;