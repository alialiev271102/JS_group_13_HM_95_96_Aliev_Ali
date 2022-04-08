const path = require('path');
const fs = require("fs").promises;
const express = require('express');
const multer = require('multer');
const { nanoid } = require('nanoid');
const config = require('../config');
const Cocktail = require("../models/Cocktail");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");


const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

router.get('/', async (req, res, next) => {
    try {
        const query = {};
        const sort = {};

        if (req.query.filter === 'image') {
            query.image = {$ne: null};
        }

        if (req.query.orderBy === 'date' && req.query.direction === 'desc') {
            sort._id = -1;
        }

        const cocktails = await Cocktail.find(query).sort(sort).populate("title");

        return res.send(cocktails);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const cocktail = await Cocktail.findById(req.params.id);

        if (!cocktail) {
            return res.status(404).send({message: 'Not found'});
        }

        return res.send(cocktail);
    } catch (e) {
        next(e);
    }
});

router.post('/', auth, permit('admin'), upload.single('image'), async (req, res, next) => {
    try {
        console.log('yrdhfjghyiudgx');
        if (!req.body.title || !req.body.recipe || !req.body.ingredients) {
            return res.status(400).send({message: 'Title, recipe and ingredients are required'});
        }

        const cocktailData = {
            creatorUserId: req.body.creatorUserId,
            title: req.body.title,
            recipe: req.body.recipe,
            isPublished: false,
            ingredients: req.body.ingredients,
            image: null,
        };

        if (req.file) {
            cocktailData.image = req.file.filename;
        }
        const cocktail = new Cocktail(cocktailData);
        await cocktail.save();

        return res.send({message: 'Created new product', id: cocktail._id});
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            if (req.file) {
                await fs.unlink(req.file.path);
            }

            return res.status(400).send(e);
        }

        next(e);
    }
});

module.exports = router;