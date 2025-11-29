/*
 * Brice Jenkins
 * Copyright 2025
 */

import ArtworkItem from "./ArtworkItem";

/**
 * Maps the ArtworkItem component onto each element of an array of artworks.
 * 
 * @param {array} artworks an array of artwork objects.
 * @param {object} shoppingCart an object representing a user's shopping cart.
 * @param {function} onView determines behavior when an artwork item is selected. 
 * @param {function} addCartItem function to run when Add to Cart button is
 * selected.
 */
function ArtworkCollection ({ artworks, shoppingCart, onView, addCartItem }) {
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