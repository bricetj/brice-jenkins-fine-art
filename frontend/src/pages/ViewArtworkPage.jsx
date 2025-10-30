/*
 * Brice Jenkins
 * Copyright: 2025
 */

import ArtworkCollection from "../components/ArtworkCollection";

function ViewArtworkPage({ artworkToView }) {
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
                    <button className="view-artwork-button">Add to Cart</button>
                </div>
            </div>
        </>
    );
}

export default ViewArtworkPage;