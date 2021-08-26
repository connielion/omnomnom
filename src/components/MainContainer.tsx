import React from 'react';
import Sidebar from './Sidebar';
import BlobsContainer from './BlobsContainer';
import styled from 'styled-components';


const MainContainer = () => {

    const Container  = styled.div`
        width: 100vw;
        height: 100vh;
        background-color: lightblue;
        display: grid;
        grid-template-columns: 350px 1fr;
    `;

    return (

        <Container>
        
            <Sidebar/>
            <BlobsContainer />

        </Container>
    )
}

export default MainContainer;