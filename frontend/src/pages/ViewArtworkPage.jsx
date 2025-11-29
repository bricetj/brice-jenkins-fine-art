/*
 * Brice Jenkins
 * Copyright 2025
 */

import Tooltip from "../components/Tooltip";

/**
 * Creates a page for viewing one particular artwork that the user
 * selects from the artwork gallery. 
 */
function ViewArtworkPage({ artworkToView, addCartItem, shoppingCart }) {
    let buttonText = "Add to Cart";
    let isDisabled = false;
    
    // Changes "Add to Cart" button text and disables button when a
    // particular item is added to the cart. 
    const changeCartButton = () => {
        for (let i = 0; i < shoppingCart.items.length; i++) {
            if (shoppingCart.items[i]._id == artworkToView._id) {
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
                                className={`view-artwork-add-button-${isDisabled}`}
                                disabled={isDisabled}
                                onClick={e => {e.preventDefault(); addCartItem(artworkToView)}}>{buttonText}</button>
                        }
                        delay={1000}>
                    </Tooltip>
                </div>
            </div>
        </>
    );
}

export default ViewArtworkPage;