/**
 * Brice Jenkins
 */

import mongoose from 'mongoose';
import 'dotenv/config';

const ARTWORK_DB_NAME = 'Artwork';

let connection = undefined;

/**
 * This function connects to the MongoDB server and to the database
 * 'Artwork' in that server.
 */
async function connect(){
    try{
        connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: ARTWORK_DB_NAME});
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

/**
 * Defines artwork schema. All properties are required.
 */
const artworkSchema = mongoose.Schema({
    title: {type: 'String', required: 'true'},
    price: {type: 'Number', required: 'true'},
    medium: {type: 'String', required: 'true'},
    materials: {type: 'String', required: 'true'},
    description: {type: 'String', required: 'true'},
    dimensions: {type: 'String', required: 'true'},
    image: {type: 'String', required: 'true'},
    date: {type: 'Date', required: 'true'}
});

/**
 * Compiles model from the schema.
 */
const Artwork = mongoose.model(ARTWORK_DB_NAME, artworkSchema);


/**
 * Creates an artwork document.
 * @param {*} title 
 * @param {*} price 
 * @param {*} medium 
 * @param {*} materials 
 * @param {*} description 
 * @param {*} dimensions 
 * @param {*} image 
 * @returns 
 */
const createArtwork = async (title, price, medium, materials, description, dimensions, image) => {
    const artwork = new Artwork({ title: title,
                                  price: price,
                                  medium: medium,
                                  materials: materials,
                                  description: description,
                                  dimensions: dimensions,
                                  image: image
                                });
    return artwork.save();
}

/**
 * Uses find() to return all artwork documents.
 * @returns A promise. Resolves to the JSON object(s) for all the document(s)
 * in the database. 
 */
const getArtworks = async () => {
    const query = Artwork.find();
    return query.exec();
}

const getNewArtworks = async () => {
    try {
        let threeMonths = new Date();
        threeMonths.setMonth(threeMonths.getMonth() - 3);

        const query = Artwork.find({
            date: {$gte: threeMonths}
        });

        return query.exec();
    } catch (error) {
        console.error('Error retrieving new documents')
    }
}

export { connect, getArtworks, getNewArtworks, createArtwork };