/*
 * Brice Jenkins
 * Copyright: 2025
 */

import ArtworkItem from "./ArtworkItem";

function ArtworkCollection ({ artworks, onView, addCartItem, shoppingCart }) {
    if(!artworks) {
        return (
            <p>No artworks to display</p>
        ) 
    }

    return (
        <div className="gallery-container">
            <div className="gallery-blocks">
                <div className="column-container">
                    {artworks.map((artwork, index) =>
                        <ArtworkItem 
                            artwork={artwork}
                            shoppingCart={shoppingCart}
                            onView={onView}
                            addCartItem={addCartItem}
                            key={index}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ArtworkCollection;