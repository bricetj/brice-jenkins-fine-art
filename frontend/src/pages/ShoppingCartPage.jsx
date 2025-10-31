/*
 * Brice Jenkins
 * Copyright: 2025
 */


import CartCollection from "../components/CartCollection";

function ShoppingCartPage({ shoppingCart, deleteCartItem, isVisible }) {
    return (
        <>
            <h2>Cart</h2>
            {isVisible && <h3 className="cart-header">{shoppingCart.quantity} Items </h3>}
            <div>
                <CartCollection 
                    shoppingCartItems={shoppingCart.items}
                    totalQuantity={shoppingCart.quantity}
                    deleteCartItem={deleteCartItem}/>
            </div>
            {isVisible && <h3 className="cart-header">Order Summary</h3>}
            <div class="cart-summary-row">
                <div class="cart-summary-column-1">
                    {isVisible && <p className="summary-text">Subtotal</p>}
                    {isVisible && <p className="summary-text">Shipping and Tax</p>}
                </div>
                <div class="cart-summary-column-2">
                    {isVisible && <p className="summary-text">${shoppingCart.total}</p>}
                    {isVisible && <p className="summary-text">Calculated at Checkout</p>}
                </div>
            </div>
            {isVisible && <div className="dividing-line"></div>}
            <div class="cart-summary-row">
                <div class="cart-summary-column-1">
                    {isVisible && <p className="summary-text">Subtotal</p>}
                </div>
                <div class="cart-summary-column-2">
                    {isVisible && <p className="summary-text">${shoppingCart.total}</p>}
                </div>
            </div>
        </>
    );
}

export default ShoppingCartPage;