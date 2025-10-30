import ArtworkItem from "./ArtworkItem";

function ArtworkCollection ({ artworks }) {
    return (
        <div className="column-container">
            {artworks.map((artwork, index) =>
                <ArtworkItem 
                    artwork={artwork}
                    key={index}
                />
            )}
        </div>
    )
}

export default ArtworkCollection;