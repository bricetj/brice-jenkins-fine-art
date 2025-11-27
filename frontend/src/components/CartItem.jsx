/*
 * Brice Jenkins
 * Copyright: 2025
 */

import Tooltip from "./Tooltip";
import { MdDelete } from "react-icons/md";

function CartItem ({ artwork, isCheckout, setItemToDelete, openPopupHandler }) {
    return (
        <div className="cart-item">
            <div className="cart-item-info">
                <div className="cart-artwork-image-background">
                    <img
                        className="cart-artwork-image" 
                        src={artwork.image}>
                    </img>
                </div>
                <div className="cart-artwork-information">
                    <div className="cart-artwork-title" >{artwork.title}</div>
                    <div className="cart-artwork-medium">{artwork.medium}</div>
                    {isCheckout && <div className="checkout-artwork-price">${artwork.price}</div>}
                </div>
                {!isCheckout && <div className="cart-artwork-price">
                    <p>${artwork.price}</p>
                </div>}
                {!isCheckout && <div className="cart-placeholder"></div>}
                {!isCheckout && <div className="cart-delete-icon">
                    <Tooltip
                        text="Select this icon to delete this item from your cart."
                        childElement={
                            <a><MdDelete
                                onClick={e => {
                                    e.preventDefault;
                                    setItemToDelete(artwork);
                                    openPopupHandler();
                                    }}/>
                            </a>
                        }
                        delay={1000}>
                    </Tooltip>
                </div>}
            </div>
        </div>
    )
}

export default CartItem;