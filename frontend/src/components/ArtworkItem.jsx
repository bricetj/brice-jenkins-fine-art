/*
 * Brice Jenkins
 * Copyright: 2025
 */

import Tooltip from "./Tooltip";

function ArtworkItem ({ artwork, onView, addCartItem, shoppingCart }) {
    let buttonText = "Add to Cart";
    let isDisabled = false;
    
    const changeCartButton = () => {
        for (let i = 0; i < shoppingCart.items.length; i++) {
            if (shoppingCart.items[i]._id == artwork._id) {
                buttonText = "Item Added";
                isDisabled = true;
                return;
            }
        }
    }

    changeCartButton();

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