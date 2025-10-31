import './App.css'
import Navigation from './components/Navigation';
import { useState } from 'react';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import ViewArtworkPage from './pages/ViewArtworkPage';
import { MdShoppingCart } from "react-icons/md";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PopupWindow from './components/PopupWindow';


function App() {
  const [artworkToView, setArtworkToView] = useState([]);
  const [shoppingCart, setShoppingCart] = useState({ items: [], quantity: 0, total: 0 });
  const [itemToDelete, setItemToDelete] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  // Handles opening the reset popup window.
  const openPopupHandler = () => {
      setPopupOpen(true);
  }

  // Handles closing the reset popup window.
  const onClose = () => {
      setPopupOpen(false);
  }

  const addCartItem = (item) => {
      setShoppingCart((prevCart) => ({
          ...prevCart,
          items: [...prevCart.items, item],
          quantity: prevCart.quantity + 1,
          total: prevCart.total + item.price
      }));
      setIsVisible(true);
  }

  const deleteCartItem = () => {
      if (shoppingCart.quantity == 1) {
         setIsVisible(false);
      }

      setShoppingCart((prevCart) => ({
          ...prevCart,
          items: prevCart.items.filter((item) => item !== itemToDelete),
          quantity: prevCart.quantity - 1,
          total: prevCart.total - itemToDelete.price
      }));

      setPopupOpen(false);
  }

  return (
    <>
      <Router>
        <header className="app-header">
          <div className="placeholder"></div>
          <div className="site-title">BRICE JENKINS FINE ART</div>
            <div className="cart-icon">
                <Link to="/cart"><MdShoppingCart/></Link>
                {isVisible && <div className="red-circle">{shoppingCart.quantity}</div>}
            </div>
        </header>
        <Navigation/>
          <Routes>
            <Route path='/' element={<HomePage setArtworkToView={setArtworkToView} addCartItem={addCartItem} />}></Route>
            <Route path='/shop' element={<ShopPage setArtworkToView={setArtworkToView} addCartItem={addCartItem}/>}></Route>
            <Route path='/cart' element={<ShoppingCartPage shoppingCart={shoppingCart} setItemToDelete={setItemToDelete} openPopupHandler={openPopupHandler} isVisible={isVisible}/>}></Route>
            <Route path='/view-artwork' element={<ViewArtworkPage artworkToView={artworkToView} addCartItem={addCartItem}/>}></Route>
          </Routes>
      </Router>
      <div>
        <PopupWindow text={`Are you sure you want to remove ${itemToDelete.title}?
                            If removed, you will have to browse for the item again
                            to return it to your cart.`}
            isVisible={popupOpen}
            noButtonText={'Cancel'}
            yesButtonText={'Remove'}
            onNo={onClose}
            onYes={deleteCartItem}
      ></PopupWindow>
      </div>
      <footer>
        <p>&copy; 2025 Brice Jenkins</p>
      </footer>
    </>
  )
}

export default App
