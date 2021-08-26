import React from "react";
import styled from "styled-components";

const Sidebar = () => {
  const SidebarContainer = styled.div`
    grid-area: 1 / 1 / 2 / 2;
    background-color: purple;
  `;

  return (
    <SidebarContainer>
      <p>Sidebar</p>
    </SidebarContainer>
  );
};

export default Sidebar;
