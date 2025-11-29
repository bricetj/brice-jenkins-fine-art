/**
 * Brice Jenkins
 * Copyright 2025
 */


/**
 * Displays order item information as a row in a nested table.
 * 
 * @param {object} item an item object from an order. 
 */
function OrderHistoryItems ({ item }) {

    return (
        <tr>
            <td>{item.title}</td>
            <td>{item.medium}</td>
            <td>${item.price}</td>
        </tr>
    );
}

export default OrderHistoryItems;