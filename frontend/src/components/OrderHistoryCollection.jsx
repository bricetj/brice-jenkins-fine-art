/**
 * Brice Jenkins
 * Copyright 2025 
 */

import OrderHistoryEntry from "./OrderHistoryEntry";

/**
 * Creates an HTML table and maps the OrderHistoryEntry component
 * onto an array of order objects to display those objects as individual
 * rows in the table.
 * 
 * @param {array} orders an array of order objects. 
 */
function OrderHistoryCollection({ orders }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order, index) => 
                    <OrderHistoryEntry 
                        order={order}
                        key={index}
                    />
                )}
            </tbody>
        </table>
    );
}

export default OrderHistoryCollection;