import React from 'react';
import styled from 'styled-components';

const SearchBar = () => {

    const Input = styled.input`
        height: 40px;
        width: 200px;
        color: #ccc;
        border-radius: 15px;
        border: none;
        margin-right:
    `;

    const AddButton = styled.button`
        height: 40px;
        width: 40px;
        border-radius: 15px;
        color: black;
        background-color: white;
        border: none;
    `;

    const Plus = styled.img``;

    return (<>
         <Input type="text" placeholder="Enter ingredients...(ex: garlic, salmon..." />
         <AddButton><Plus src="plus.svg"/></AddButton>
    </>)
}

export default SearchBar;