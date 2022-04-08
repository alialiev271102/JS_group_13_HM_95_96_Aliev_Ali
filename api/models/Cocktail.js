const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mime = require('mime-types');
const config = require('../config');

const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

const ingredient = {
    name: String,
    amount: Number
}

const CocktailSchema = new Schema({
    creatorUserId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // validate: {
        //     validator: function (value) {
        //         const filePath = path.join(config.uploadPath, value);
        //         const mimeType = mime.lookup(filePath);
        //         return imageMimeTypes.includes(mimeType);
        //     },
        //     message: 'Image file format is incorrect'
        // }
    },
    recipe: {
        type: String,
        required: true
    },
    isPublished: {
        type: Boolean
    },
    ingredients: {
        type: [ingredient],
        required: true
    }
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);

module.exports = Cocktail;