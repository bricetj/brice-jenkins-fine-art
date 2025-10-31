/**
 * Brice Jenkins
 */

import mongoose from 'mongoose';
import 'dotenv/config';

const ARTWORK_DB_NAME = 'Artwork';
const CART_DB_NAME = 'Cart';

let connection = undefined;

/**
 * This function connects to the MongoDB server and to the database
 * 'Artwork' in that server.
 */
async function connect(){
    try{
        connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: ARTWORK_DB_NAME});
        console.log("Successfully connected to Artwork DB using Mongoose!");
        connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: CART_DB_NAME});
        console.log("Successfully connected to Cart DB using Mongoose!");
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

const cartItemSchema = mongoose.Schema({
    artworkId: {type: mongoose.Schema.Types.ObjectId, ref: 'Artwork', unique: true },
    quantity: {type: 'Number', required: 'true'}
});

const cartSchema = mongoose.Schema({
    items: [cartItemSchema],
    totalQuantity: {type: 'Number', required: 'true'},
    totalPrice: {type: 'Number', required: 'true'},
});

/**
 * Compiles model from the schema.
 */
const Artwork = mongoose.model(ARTWORK_DB_NAME, artworkSchema);
const Cart = mongoose.model(CART_DB_NAME, cartSchema);


/* ARTWORK MODEL METHODS */
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
        console.error('Error retrieving new documents');
    }
}

/* CART MODEL METHODS */

// const createCartItem = async (artworkId, quantity) => {
//     try {

//     } catch (error) {
//         console.error('Error creating new cart item');
//     }
// }

// const createCart = async () => {
//     try {

//     } catch (error) {
//         console.error('Error creating new cart');
//     }
// }

export { connect, getArtworks, getNewArtworks, createArtwork };