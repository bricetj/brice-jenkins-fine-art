import ArtworkItem from "./ArtworkItem";

function ArtworkCollection ({ artworks, onView }) {
    return (
        <div className="gallery-container">
            <div className="gallery-blocks">
                <div className="column-container">
                    {artworks.map((artwork, index) =>
                        <ArtworkItem 
                            artwork={artwork}
                            onView={onView}
                            key={index}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ArtworkCollection;