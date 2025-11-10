/**
 * Brice Jenkins
 * Copyright 2025
 */

import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as shop from './model.mjs';

const ERROR_INVALID_REQ = {Error: 'Invalid request'};
const ERROR_NOT_FOUND = {Error: "Not found"};
const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.listen(PORT, async () => {
    await shop.connect()
    console.log(`Server listening on port ${PORT}...`);
});

/* ARTWORK DB API'S*/

// /**
//  * Creates a new artwork with the query parameters provided in the body.
//  * @route POST /artworks
//  * @response Body: A JSON object with the properties of the artwork object
//  * sent in the request, as well as the _id and __v properties.
//  */
app.post('/artworks', asyncHandler(async (req, res) => {
    const newArtwork = await shop.createArtwork(req.body.title,
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
    const artworks = await shop.getArtworks();
    res.status(200).json(artworks);
}));

/**
 * Retrieves all Artwork documents with date no more than 3 months before
 * current date.
 * @route GET /artworks/new
 * @response Body: A JSON array containing objects of all artworks.
 */
app.get('/artworks/new', asyncHandler(async (req, res) => {
    const artworks = await shop.getNewArtworks();
    res.status(200).json(artworks);
}))
