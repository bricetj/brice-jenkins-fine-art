/**
 * Brice Jenkins
 * Copyright 2025
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartCollection from "../components/CartCollection";

/**
 * Displays a checkout page with input fields to enter shipping information and
 * billing information; also displays a summary of items in a user's cart. Allows
 * user to submit their order, which generates a confirmation email.
 */
function CheckoutPage ({ shoppingCart, setShoppingCart, setIsVisible, loggedIn }) {
    const [loading, setLoading] = useState(true);
    const [cardLogo, setCardLogo] = useState(null);
    const [logoVisible, setLogoVisible] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const navigate = useNavigate();

    // Shipping info state variables.
    const [emailAddress, setEmailAddress] = useState();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');

    // Payment state variables.
    const [cardholder, setCardholder] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [expiration, setExpiration] = useState('');

    useEffect(() => {
        // Retrieves user email if already signed in.
        const getUserEmail = async() => {
            const response = await fetch("http://localhost:3001/auth/login-status", { 
                credentials: "include"
            });
            const data = await response.json();

            if (response.status === 200) {
                setEmailAddress(data.email);
            }
        }
        getUserEmail();
    }, []);
    

    useEffect(() => {
        // Retrieves a user's shopping cart.  
        const getShoppingCart = async() => {
            const response = await fetch("http://localhost:3002/cart/items", {  
                credentials: "include"
            });
            const data = await response.json();
            if (response.status === 200 || response.status === 201) {
                setShoppingCart(data.cart);
                shoppingCart = data.cart;
                setLoading(false);
            } else {
                console.log("Error getting or creating cart")
            }
        }

        getShoppingCart();
    }, []);

    // Validates a card number and displays corresponding card type logo.
    const cardNumChangeHandler = async(cardNum) => {
        const response = await fetch("http://localhost:3003/payment/validate", {
            method: "POST",
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({cardNum: cardNum}) 
        });

        const data = await response.json();
        const cardType = data.cardType;

        let logoUrl;
        if(cardType !== "Card not recognized") {
            logoUrl = `../src/assets/logos/${cardType}.png`
        }

        if (logoUrl) {
            setCardNumber(cardNum);
            setCardLogo(logoUrl);
            setLogoVisible(true);
        } else {
            setCardNumber(cardNum);
            setCardLogo(null);
            setLogoVisible(false);
        }
    }

    // Handles when email subscription checkbox is clicked.
    const checkboxHandler = (event) => {
        setIsSubscribed(event.target.checked);
    }

    // Calls API when user opts in for email notifications.
    const handleSubscribe = async() => {
        console.log("sending fetch")
        const subResponse = await fetch (
            "http://localhost:6003/opt-in", {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({email: emailAddress})
            } 
        );
        const data = await subResponse.json();
        if (subResponse.status === 200) {
            console.log(data.message);
        }
    }

    // Empties a cart. Called after successful payment.
    const emptyCart = async() => {
        const response = await fetch("http://localhost:3002/cart/items", {
            method: "DELETE",
            credentials: "include"
        });
        const data = await response.json();
        if (response.status === 200) {
            setShoppingCart(data.cart);
            setIsVisible(false);
        } else {
            console.log("Error emptying cart")
        }
    }

    // Handles submission of order data.
    const submitOrderHandler = async() => {
        const items = shoppingCart.items;
        const total = shoppingCart.total;
        const email = emailAddress;
        const shippingInfo = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            address: address,
            city: city,
            state: state,
            zip: zip
        };
        const billingInfo = {
            cardholder: cardholder,
            cardNum: cardNumber,
            cvv: cvv,
            expiration: expiration
        };
        const orderResponse = await fetch(
            "http://localhost:3003/payment/orders", {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    items: items,
                    total: total,
                    email: email,
                    shippingInfo: shippingInfo,
                    billingInfo: billingInfo,
                })
            } 
        );
        const data = await orderResponse.json();
        if (orderResponse.status === 200) {
            if (isSubscribed) {
                await handleSubscribe();
            }
            console.log(data.message);
            alert("Your order was processed successfully!");
            await emptyCart();
            navigate("/");
        } else {
            alert("There was an error processing your order");
        }
    }

    // Handles rerendering until data is loaded.
    if (loading) {
        return
    }

    return(
        <>
            <h2>Checkout</h2>
            <div className="checkout-page-div">
                <div className="checkout-forms-div">
                    <form 
                        className="checkout-info-form"
                        onSubmit={e => {
                            e.preventDefault();
                            submitOrderHandler();
                            }}>
                        <h3>Shipping Information</h3>
                        <fieldset>
                            <div>
                                {!loggedIn && <div>
                                    <input 
                                        required
                                        value={emailAddress || ''}
                                        placeholder="Email Address"
                                        onChange={e => {
                                            setEmailAddress(e.target.value);
                                        }}>
                                    </input>
                                </div>}
                            </div>
                            <div>
                                <div>
                                    <input 
                                        required
                                        placeholder="First Name"
                                        onChange={e => {
                                            setFirstName(e.target.value);
                                        }}>
                                    </input>
                                </div>
                            </div>
                            <div>
                                <div className="">
                                    <input
                                        required
                                        placeholder="Last Name"
                                        onChange={e => {
                                            setLastName(e.target.value);
                                        }}>
                                    </input>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input 
                                        required
                                        placeholder="Phone Number"
                                        onChange={e => {
                                            setPhoneNumber(e.target.value);
                                        }}>
                                    </input>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input 
                                        required
                                        placeholder="Address"
                                        onChange={e => {
                                            setAddress(e.target.value);
                                        }}>
                                    </input>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input 
                                        required
                                        placeholder="City"
                                        onChange={e => {
                                            setCity(e.target.value);
                                        }}>
                                    </input>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input 
                                        required
                                        placeholder="State"
                                        onChange={e => {
                                            setState(e.target.value);
                                        }}>
                                    </input>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input 
                                        required
                                        placeholder="Zip Code"
                                        onChange={e => {
                                            setZip(e.target.value);
                                        }}>
                                    </input>
                                </div>
                            </div> 
                        </fieldset>
                        <h3>Payment Information</h3>
                        <fieldset>
                            <div>
                                <div>
                                    <input 
                                        required
                                        placeholder="Cardholder Name"
                                        onChange={e => {
                                            setCardholder(e.target.value);
                                        }}>
                                    </input>
                                </div>
                            </div>
                            <div>
                                <div className = "card-number-div">
                                    <input 
                                        required
                                        placeholder="Credit Card Number"
                                        onChange={e => {
                                            cardNumChangeHandler(e.target.value);
                                        }}>
                                    </input>
                                    {logoVisible && <img
                                        className="card-logo-image"
                                        src={cardLogo}
                                        alt="Credit card logo">
                                    </img>}
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input
                                        required
                                        placeholder="CVV"
                                        onChange={e => {
                                            setCvv(e.target.value);
                                        }}>
                                    </input>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input 
                                        type="text"
                                        placeholder="Expiration Date (MM/YY)"
                                        required
                                        onChange={e => {
                                            setExpiration(e.target.value);
                                        }}>
                                    </input>
                                </div>
                            </div>
                        </fieldset>
                        <div className="checkbox-div">
                            <input
                                type="checkbox"
                                checked={isSubscribed}
                                onChange={checkboxHandler}>
                            </input>
                            <label>Subscribe for email updates concerning new artworks or promotions!</label>
                        </div>
                        <button type="submit">Submit Order</button>
                    </form>
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
                </div>
            </div>
        </>
    )
}

export default CheckoutPage;