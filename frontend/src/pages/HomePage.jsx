/*
 * Brice Jenkins
 * Copyright: 2025
 */

import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import ArtworkCollection from "../components/ArtworkCollection";
import { useNavigate } from "react-router-dom";

/**
 * React page component that creates a simple homepage for the app.
 */
function HomePage({ setArtworkToView, addCartItem, shoppingCart }) {
    const [artworks, setArtworks] = useState([]);
    const navigate = useNavigate();

    // Calls the 'GET /artworks' endpoint in the REST API.
    const loadArtworks = async () => {
        const response = await fetch('/artworks/new');
        const data = await response.json();
        setArtworks(data);
    }

    useEffect( () => {
        loadArtworks();
    }, []);

    const onView = (artwork) => {
        setArtworkToView(artwork)
        navigate('/view-artwork')
    }

    return (
        <>
            <div className="welcome-banner-container">
                <img
                    className="banner-image"
                    src="../src/assets/images/banner-image.jpeg"
                    alt="Image of flower">
                </img>
                <div className="tagline-text">Capturing beauty in every form</div>
                <div 
                    className="instruction-text"
                        >Click the "Shop Artworks" button to browse the gallery
                        <br/>
                        or see Brice's new artworks below!
                </div>
                <div className="banner-button">
                    <Link to="/shop"><button>Shop Artworks</button></Link>
                </div>
            </div>
            <h2>New Artworks</h2>
            <ArtworkCollection
                artworks={artworks}
                shoppingCart={shoppingCart}
                setArtworkToView={setArtworkToView}
                onView={onView}
                addCartItem={addCartItem}/>

        </>
    );
}

export default HomePage;