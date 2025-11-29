/**
 * Brice Jenkins
 * Copyright 2025
 */

import { useEffect, useState } from 'react';
import OrderHistoryCollection from '../components/OrderHistoryCollection';

/**
 * Displays a users order history by retrieving a user's login email and
 * retrieving orders from the payment service for that email. Protected
 * by the Route Authenticator.
 */
function OrderHistoryPage () {
    const [orders, setOrders] = useState([]);
    const [userEmail, setUserEmail] = useState(null);

    // Calls the authorization service to retrieve the signed in user's email.
    useEffect(() => {
        const getUserEmail = async() => {
            const response = await fetch("http://localhost:3001/auth/login-status", { 
                credentials: "include"
            });
            const data = await response.json();
            console.log(data.email)

            if (response.status === 200) {
                setUserEmail(data.email);
            }
        }
        getUserEmail();
    }, []);

    // Retrieves orders for the logged in user.
    useEffect(() => {
        const loadOrders = async () => {
            const response = await fetch("http://localhost:3003/payment/orders/history", {
                method: "POST",
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({email: userEmail}) 
            });
            const data = await response.json();
            if (response.status === 200) {
                console.log(data.orders)
                setOrders(data.orders);
            } else {
                console.log("No order history");
            }
        }
        loadOrders();
    }, [userEmail]);

    // If there are no previous orders.
    if (orders.length === 0) {
        return (
            <>
                <h2>Order History</h2>
                <p>No order history</p>
            </>
        )
    }

    return (
        <>
            <h2>Order History</h2>
            <OrderHistoryCollection
                orders = {orders}>
            </OrderHistoryCollection>
        </>
    ) 
}

export default OrderHistoryPage;