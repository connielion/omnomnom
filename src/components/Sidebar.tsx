import React from "react";
import styled from 'styled-components'
import SearchBar from './SearchBar';

const Sidebar = () => {

    const SidebarContainer = styled.div`
        grid-area: 1 / 1 / 2 / 2;
        background-color: purple;
    `

    return (
    <SidebarContainer>
        <SearchBar/>
    </SidebarContainer>
    )
}

export default Sidebar;