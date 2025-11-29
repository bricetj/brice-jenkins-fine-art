/*
 * Brice Jenkins
 * Copyright 2025
 */

import CartItem from "./CartItem";

/**
 * Maps the CartItem component onto each element of an array of shopping cart items.
 * 
 * @param {array} shoppingCartItems an array of artwork objects.
 * @param {boolean} isCheckout used to determine cart appearance when on shopping cart
 * page or checkout page. 
 * @param {function} setItemToDelete sets state variable to artwork object that user wants
 * to delete. 
 * @param {function} openPopupHandler function to open Delete Item popup window (from App.jsx).
 */
function CartCollection ({ shoppingCartItems, isCheckout, setItemToDelete, openPopupHandler }) {
    return (
        <div className="cart-container">
            <div className="cart-blocks">
                <div className="row-container">
                    {shoppingCartItems.map((artwork, index) =>
                        <CartItem
                            isCheckout={isCheckout} 
                            artwork={artwork}
                            setItemToDelete={setItemToDelete}
                            openPopupHandler={openPopupHandler}
                            key={index}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default CartCollection;