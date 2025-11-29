/*
 * Brice Jenkins
 * Copyright 2025
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArtworkCollection from "../components/ArtworkCollection";

/**
 * Displays a gallery of artworks by retrieving the artworks from the
 * database and displaying them using the ArtworkCollection component. 
 */
function ShopPage({ setArtworkToView, addCartItem, shoppingCart }) {
    const [artworks, setArtworks] = useState([]);
    const navigate = useNavigate();
    
    // Calls the 'GET /artworks' endpoint in the REST API.
    useEffect( () => {
        const loadArtworks = async () => {
            const response = await fetch('/artworks');
            const data = await response.json();
            setArtworks(data);
        }

        loadArtworks();
    }, []);

    // When a user clicks on an artwork.
    const onView = (artwork) => {
        setArtworkToView(artwork)
        navigate('/view-artwork')
    }

    return (
        <>
            <h2>Shop Artworks</h2>
            <ArtworkCollection
                artworks={artworks}
                onView={onView}
                addCartItem={addCartItem}
                shoppingCart={shoppingCart}/>
        </>
    );
}

export default ShopPage;