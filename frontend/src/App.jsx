import './App.css'
import Navigation from './components/Navigation';
import { useState } from 'react';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import ViewArtworkPage from './pages/ViewArtworkPage';
import { MdShoppingCart } from "react-icons/md";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function App() {
  const [artworkToView, setArtworkToView] = useState([]);
  const [shoppingCart, setShoppingCart] = useState({ items: [], quantity: 0, total: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const addCartItem = (item) => {
      setShoppingCart((prevCart) => ({
          ...prevCart,
          items: [...prevCart.items, item],
          quantity: prevCart.quantity + 1,
          total: prevCart.total + item.price
      }));
      setIsVisible(true);
  }

  const deleteCartItem = (itemToRemove) => {
      if (shoppingCart.quantity == 1) {
         setIsVisible(false);
      }

      setShoppingCart((prevCart) => ({
          ...prevCart,
          items: prevCart.items.filter((item) => item !== itemToRemove),
          quantity: prevCart.quantity - 1,
          total: prevCart.total - itemToRemove.price
      }));
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
            <Route path='/cart' element={<ShoppingCartPage shoppingCart={shoppingCart} deleteCartItem={deleteCartItem} isVisible={isVisible}/>}></Route>
            <Route path='/view-artwork' element={<ViewArtworkPage artworkToView={artworkToView} addCartItem={addCartItem}/>}></Route>
          </Routes>
      </Router>
      <footer>
        <p>&copy; 2025 Brice Jenkins</p>
      </footer>
    </>
  )
}

export default App
