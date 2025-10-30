/**
 * Brice Jenkins
 */

import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as artwork from './model.mjs';

const ERROR_INVALID_REQ = {Error: 'Invalid request'};
const ERROR_NOT_FOUND = {Error: "Not found"};
const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.listen(PORT, async () => {
    await artwork.connect()
    console.log(`Server listening on port ${PORT}...`);
});


// /**
//  * Creates a new artwork with the query parameters provided in the body.
//  * @route POST /artworks
//  * @response Body: A JSON object with the properties of the artwork object
//  * sent in the request, as well as the _id and __v properties.
//  */
app.post('/artworks', asyncHandler(async (req, res) => {
    // Checks if request params are valid.
    const newArtwork = await artwork.createArtwork(req.body.title,
                                                req.body.price,
                                                req.body.medium,
                                                req.body.materials,
                                                req.body.description,
                                                req.body.dimensions,
                                                req.body.image);
                                                    
        res.status(201).json(newArtwork);
    }
));

/**
 * Retrieves all Artwork documents in the database.
 * @route GET /artworks
 * @response Body: A JSON array containing objects of all artworks.
 */
app.get('/artworks', asyncHandler(async (req, res) => {
    const artworks = await artwork.getArtworks();
    res.status(200).json(artworks);
}));

app.get('/artworks/new', asyncHandler(async (req, res) => {
    const artworks = await artwork.getNewArtworks();
    res.status(200).json(artworks);
}))
