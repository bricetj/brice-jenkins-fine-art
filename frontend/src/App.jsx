import './App.css'
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import { MdShoppingCart } from "react-icons/md";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

function App() {

  return (
    <>
      <header className="app-header">
        <div className="placeholder"></div>
        <div className="site-title">BRICE JENKINS FINE ART</div>
        <div className="cart-icon">
            <a href="/cart"><MdShoppingCart/></a>
        </div>
      </header>
      <Router>
        <Navigation/>
          <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/shop' element={<ShopPage />}></Route>
            <Route path='/cart' element={<ShoppingCartPage />}></Route>
          </Routes>
      </Router>
      <footer>
        <p>&copy; 2025 Brice Jenkins</p>
      </footer>
    </>
  )
}

export default App
