function ArtworkItem ({ artwork }) {
    return (
        <div className="artwork-item">
            <div className="artwork-image-background">
                <img
                    className="artwork-image" 
                    src={artwork.image}>
                </img>
            </div>
            <div className="artwork-title">{artwork.title}</div>
            <div className="artwork-price">${artwork.price}</div>
            <div className="artwork-medium">{artwork.medium}</div>
            <button className="artwork-button">Add to Cart</button>
        </div>
    )
}

export default ArtworkItem;