import { useState, useEffect } from "react";
import CartCollection from "../components/CartCollection";

function CheckoutPage ({ shoppingCart, setShoppingCart }) {
    const [checked, setChecked] = useState(false);
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

    const handleCheck = () => {
        if (!checked) {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }

    // Handles rerendering until data is loaded.
    if (loading) {
        return
    }

    return(
        <>
            <h2>Checkout</h2>
            <div class="checkout-page-div">
                <div className="checkout-forms-div">
                    <h3>Shipping Information</h3>
                    <form className="checkout-info-form">
                        <fieldset>
                            <div>
                                <div>
                                    <input 
                                        required
                                        placeholder="First Name">
                                    </input>
                                </div>
                            </div>
                            <div>
                                <div className="">
                                    <input
                                        required
                                        placeholder="Last Name">
                                    </input>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input 
                                        required
                                        placeholder="Phone Number">
                                    </input>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input 
                                        required
                                        placeholder="Address">
                                    </input>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input 
                                        required
                                        placeholder="City">
                                    </input>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input 
                                        required
                                        placeholder="State">
                                    </input>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input 
                                        required
                                        placeholder="Zip Code">
                                    </input>
                                </div>
                            </div>
                            
                        </fieldset>
                    </form>
                    <input type="checkbox" onClick={handleCheck}></input><label>Billing is the same as shipping</label>
                    <br></br>
                    {!checked && 
                    <div>
                        <h3>Billing Information</h3>
                        <form className="checkout-info-form">
                        <fieldset>
                            <div>
                                <div>
                                    <input 
                                        required
                                        placeholder="First Name">
                                    </input>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input
                                        required
                                        placeholder="Last Name">
                                    </input>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input 
                                        required
                                        placeholder="Phone Number">
                                    </input>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input 
                                        required
                                        placeholder="Address">
                                    </input>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input 
                                        required
                                        placeholder="City">
                                    </input>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input 
                                        required
                                        placeholder="State">
                                    </input>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input 
                                        required
                                        placeholder="Zip Code">
                                    </input>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                    </div>}
                    <div>
                        <h3>Payment Information</h3>
                        <form className="checkout-info-form">
                        <fieldset>
                            <div>
                                <div>
                                    <input 
                                        required
                                        placeholder="Credit Card Number">
                                    </input>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input
                                        required
                                        placeholder="CVV">
                                    </input>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input 
                                        type="text"
                                        placeholder="Expiration Date (MM/YY)"
                                        required>
                                    </input>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                    </div>
                </div>
                <div className="your-order-div">
                    <h3>Your Order</h3>
                    <fieldset>
                        <CartCollection 
                            shoppingCartItems={shoppingCart.items}
                            isCheckout={true}/>
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
                    </fieldset>
                    <button type="submit">Submit Order</button>
                </div>
            </div>
        </>
    )
}

export default CheckoutPage;