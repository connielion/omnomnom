import React, {FC} from "react";

interface BlobsProps {
    renderCards: Function;
    renderBlobs: Function;
    userSearchedRecipes: Boolean;
}

const Blobs: FC<BlobsProps> = ({renderCards, renderBlobs, userSearchedRecipes}) => {

    return (<>{userSearchedRecipes? renderCards() : renderBlobs()}</>)
}

export default Blobs;