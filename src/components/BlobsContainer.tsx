import React from "react";
import styled from 'styled-components';

const BlobsContainer = () => {
    const BlobsContainer = styled.div`
        grid-area: 1 / 2 / 2 / 3;
        background-color: #fff;
    `; 

    return (<BlobsContainer>
       <p>Blobs</p>
    </BlobsContainer>)
}

export default BlobsContainer;