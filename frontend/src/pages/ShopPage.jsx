/*
 * Brice Jenkins
 * Copyright: 2025
 */

import { useEffect, useState } from 'react';
import ArtworkCollection from "../components/ArtworkCollection";

function ShopPage() {
    const [artworks, setArtworks] = useState([]);
    
    // Calls the 'GET /artworks' endpoint in the REST API.
    const loadArtworks = async () => {
        const response = await fetch('/artworks');
        const data = await response.json();
        setArtworks(data);
    }

    useEffect( () => {
        loadArtworks();
    }, []);

    return (
        <>
            <h2>Shop Artworks</h2>
            <ArtworkCollection artworks={artworks}/>
        </>
    );
}

export default ShopPage;