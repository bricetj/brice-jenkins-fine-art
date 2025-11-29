/**
 * Brice Jenkins
 * Copyright 2025 
 */

import OrderHistoryItems from "./OrderHistoryItems";

/**
 * Returns a row in an HTML table filled with order data. Uses
 * a nested table to display individual items in each order by
 * mapping the OrderHistoryItems component onto each element in an
 * array of order items.
 *  
 * @param {object} order an order object.
 */
function OrderHistoryEntry ({ order }) {
    const orderId = order.id;
    const orderDate = order.order.date;
    const orderItems = order.order.items;
    const orderTotal = order.order.total;

    return (
        <tr>
            <td>{orderId}</td>
            <td>{orderDate}</td>
            <td>
                <div className="nested-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Medium</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderItems.map((item, index) => 
                                <OrderHistoryItems 
                                    item={item}
                                    key={index}
                                />
                            )}
                        </tbody>
                    </table>
                </div>
            </td>
            <td>${orderTotal}</td>
        </tr>
    );
}

export default OrderHistoryEntry;