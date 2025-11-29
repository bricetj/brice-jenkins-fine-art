/*
 * Brice Jenkins
 * Copyright 2025
 */

import Tooltip from "./Tooltip";

/**
 * React component that displays a particular artwork and its associated
 * information in a table or grid view.
 * 
 * @param {array} artwork an artwork object.
 * @param {object} shoppingCart an object representing a user's shopping cart.
 * @param {function} onView determines behavior when an artwork item is selected. 
 * @param {function} addCartItem function to run when Add to Cart button is
 * selected.
 */
function ArtworkItem ({ artwork, shoppingCart, onView, addCartItem }) {
    let buttonText = "Add to Cart";
    let isDisabled = false;

    // Changes "Add to Cart" button text and disables button when a
    // particular item is added to the cart.
    const changeCartButton = () => {
        for (let i = 0; i < shoppingCart.items.length; i++) {
            if (shoppingCart.items[i]._id == artwork._id) {
                buttonText = "Item Added";
                isDisabled = true;
                return;
            }
        }
    }
    
    if (shoppingCart.items) {
        changeCartButton();
    }

    return (
        <div className="artwork-item">
            <div className="artwork-image-background"
                 onClick={e => {e.preventDefault();
                                onView(artwork)}}>
                <img
                    className="artwork-image" 
                    src={artwork.image}>
                </img>
            </div>
            <div className="artwork-title">{artwork.title}</div>
            <div className="artwork-price">${artwork.price}</div>
            <div className="artwork-medium">{artwork.medium}</div>
            <Tooltip
                text={"Click this button to save this item to your cart. You can remove items later if desired."}
                childElement={
                    <button
                        className={`artwork-add-button-${isDisabled}`}
                        disabled={isDisabled}
                        onClick={e => {
                                    e.preventDefault();
                                    addCartItem(artwork);
                                    }}
                    >{buttonText}</button>
                }
                delay={1000}>
            </Tooltip>
        </div>
    )
}

export default ArtworkItem;