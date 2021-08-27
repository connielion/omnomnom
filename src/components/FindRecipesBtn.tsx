import React, {FC} from 'react';
import styled from 'styled-components';

interface FindRecipesBtnProps {
    searchRecipesOnClick: (event: React.MouseEvent<HTMLButtonElement>)=> void;
}
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

const FindRecipesBtn
: FC<FindRecipesBtnProps>
 = ({searchRecipesOnClick}) => {
    return (
        <RecipesBtn onClick={searchRecipesOnClick}>
            <h2>Find Recipes</h2>
        </RecipesBtn>
    )
}

export default FindRecipesBtn;