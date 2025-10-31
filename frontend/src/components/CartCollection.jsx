import CartItem from "./CartItem";

function CartCollection ({ shoppingCartItems, totalQuantity, deleteCartItem }) {
    // Message to display if cart is empty.
    if (totalQuantity == 0) {
        return (
            <p>There are no items in your cart</p>
        )
    }

    return (
        <div className="cart-container">
            <div className="cart-blocks">
                <div className="row-container">
                    {shoppingCartItems.map((artwork, index) =>
                        <CartItem 
                            artwork={artwork}
                            deleteCartItem={deleteCartItem}
                            key={index}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default CartCollection;