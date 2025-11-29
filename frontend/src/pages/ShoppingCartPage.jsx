/*
 * Brice Jenkins
 * Copyright 2025
 */

import CartCollection from "../components/CartCollection";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * Creates a shopping cart page by retrieving the user's shopping cart and 
 * displaying the items using the CartCollection component.
 */
function ShoppingCartPage({ shoppingCart, setShoppingCart, setItemToDelete, openPopupHandler, isVisible }) {
    const[loading, setLoading] = useState(true);
    
    useEffect(() => {
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
        
        getShoppingCart();
    }, []);

    // Handles rerendering until data is loaded.
    if (loading) {
        return
    }

    if (!isVisible) {
        return (
            <>
                <h2>Cart</h2>
                <p>There are no items in your cart</p>
            </>
        )
    }

    if (isVisible) {
        return (
            <>
                <h2>Cart</h2>
                <h3 className="cart-header">{shoppingCart.quantity} Items </h3>
                <div>
                    <CartCollection 
                        shoppingCartItems={shoppingCart.items}
                        isCheckout={false}
                        setItemToDelete={setItemToDelete}
                        openPopupHandler={openPopupHandler}/>
                </div>
                <h3 className="cart-header">Order Summary</h3>
                <div className="cart-summary-row">
                    <div className="cart-summary-column-1">
                        <p className="summary-text">Subtotal</p>
                        <p className="summary-text">Tax and Shipping</p>
                    </div>
                    <div className="cart-summary-column-2">
                        <p className="summary-text">${shoppingCart.total}</p>
                        <p className="summary-text">Included</p>
                    </div>
                </div>
                <div className="dividing-line"></div>
                <div className="cart-summary-row">
                    <div className="cart-summary-column-1">
                        <p className="summary-text">Total</p>
                    </div>
                    <div className="cart-summary-column-2">
                        <p className="summary-text">${shoppingCart.total}</p>
                    </div>
                </div>
                <Link to="/checkout"><button>Checkout</button></Link>
            </>
        )
    };
}

export default ShoppingCartPage;