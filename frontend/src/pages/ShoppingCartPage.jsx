/*
 * Brice Jenkins
 * Copyright: 2025
 */

import CartCollection from "../components/CartCollection";
import {useState, useEffect} from "react";


function ShoppingCartPage({ shoppingCart, setShoppingCart, setItemToDelete, openPopupHandler, isVisible }) {
    const[loading, setLoading] = useState(true);
    
    const getShoppingCart = async() => {
        const response = await fetch("http://localhost:3002/cart/items", {  
            credentials: "include"
        });
        const data = await response.json();
        if (response.status === 200 || response.status === 201) {
            setShoppingCart(data.cart);
            shoppingCart=data.cart;
            setLoading(false);
        } else {
            console.log("Error getting or creating cart")
        }
    }

    useEffect(() => {
        getShoppingCart();
    })

    // Handles rerendering until data is loaded.
    if (loading) {
        return
    }

    return (
        <>
            <h2>Cart</h2>
            {isVisible && <h3 className="cart-header">{shoppingCart.quantity} Items </h3>}
            <div>
                <CartCollection 
                    shoppingCartItems={shoppingCart.items}
                    totalQuantity={shoppingCart.quantity}
                    setItemToDelete={setItemToDelete}
                    openPopupHandler={openPopupHandler}/>
            </div>
            {isVisible && <h3 className="cart-header">Order Summary</h3>}
            <div className="cart-summary-row">
                <div className="cart-summary-column-1">
                    {isVisible && <p className="summary-text">Subtotal</p>}
                    {isVisible && <p className="summary-text">Shipping and Tax</p>}
                </div>
                <div className="cart-summary-column-2">
                    {isVisible && <p className="summary-text">${shoppingCart.total}</p>}
                    {isVisible && <p className="summary-text">Calculated at Checkout</p>}
                </div>
            </div>
            {isVisible && <div className="dividing-line"></div>}
            <div className="cart-summary-row">
                <div className="cart-summary-column-1">
                    {isVisible && <p className="summary-text">Subtotal</p>}
                </div>
                <div className="cart-summary-column-2">
                    {isVisible && <p className="summary-text">${shoppingCart.total}</p>}
                </div>
            </div>
        </>
    );
}

export default ShoppingCartPage;