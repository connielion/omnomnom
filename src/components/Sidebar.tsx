import React from "react";
<<<<<<< HEAD
import styled from "styled-components";
=======
import styled from 'styled-components'
import SearchBar from './SearchBar';
>>>>>>> dd9d2ff99bd4b6aa28bdef3ca02670963bf21ac4

const Sidebar = () => {
  const SidebarContainer = styled.div`
    grid-area: 1 / 1 / 2 / 2;
    background-color: purple;
  `;

  return (
    <SidebarContainer>
<<<<<<< HEAD
      <p>Sidebar</p>
=======
        <SearchBar/>
>>>>>>> dd9d2ff99bd4b6aa28bdef3ca02670963bf21ac4
    </SidebarContainer>
  );
};

export default Sidebar;
