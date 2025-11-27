/*
 * Brice Jenkins
 * Copyright: 2025
 */

import CartItem from "./CartItem";

function CartCollection ({ isCheckout, shoppingCartItems, setItemToDelete, openPopupHandler }) {
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