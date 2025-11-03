/*
 * Brice Jenkins
 * Copyright: 2025
 */

import Tooltip from "./Tooltip";
import { MdDelete } from "react-icons/md";

function CartItem ({ artwork, setItemToDelete, openPopupHandler }) {
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
                </div>
                <div className="cart-artwork-price">
                    <p>${artwork.price}</p>
                </div>
                <div className="cart-placeholder"></div>
                <div className="cart-delete-icon">
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
                </div>
            </div>
        </div>
    )
}

export default CartItem;