/*
 * Brice Jenkins
 * Copyright: 2025
 */

import { Link } from "react-router-dom";

/**
 * React page component that creates a simple homepage for the app.
 */
function HomePage() {
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
        </>
    );
}

export default HomePage;