/*
 * Brice Jenkins
 * Copyright: 2025
 */

import ArtworkCollection from "../components/ArtworkCollection";
import Tooltip from "../components/Tooltip";

function ViewArtworkPage({ artworkToView, addCartItem }) {
    return (
        <>
            <div className="view-artwork-container">
                <div className="view-artwork-image-background">
                    <img 
                        className="view-artwork-image"
                        src={artworkToView.image}>
                    </img>
                </div>
                <div className="view-artwork-information">
                    <h2>{artworkToView.title}</h2>
                    <p>${artworkToView.price}</p>
                    <h3>Materials</h3>
                    <p>{artworkToView.materials}</p>
                    <h3>Description</h3>
                    <p>{artworkToView.description}</p>
                    <h3>Dimensions</h3>
                    <p>{artworkToView.dimensions}</p>
                    <Tooltip
                        text={"Click this button to save this item to your cart. You can remove items later if desired."} 
                        childElement={
                            <button
                                className="view-artwork-button"
                                onClick={e => {e.preventDefault(); addCartItem(artworkToView)}}>Add to Cart</button>
                        }
                        delay={1000}>
                    </Tooltip>
                </div>
            </div>
        </>
    );
}

export default ViewArtworkPage;