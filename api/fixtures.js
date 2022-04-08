const mongoose = require('mongoose');
const config = require("./config");
const User = require("./models/User");
const Cocktail = require("./models/Cocktail");
const {nanoid} = require("nanoid");

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    await Cocktail.create({
        creatorUserId: 'c6or8gC8lBMVmjlwsc0wo',
        title: 'Juicy milk',
        image: 'Milk.jpg',
        recipe: 'mix everything',
        isPublished: true,
        ingredients: [
            {
                name: 'milk (ml)',
                amount: 50
            },{
                name: 'juice (ml)',
                amount: 100
            }
        ]
    }, {
        creatorUserId: 'c6or8gC8lBMVmjlwsc0wo',
        title: 'Red alcoholic cocktail',
        image: 'Milk.jpg',
        recipe: 'mix everything',
        isPublished: true,
        ingredients: [
            {
                name: 'cranberry juice (ml)',
                amount: 50
            }, {
                name: 'lime',
                amount: 4
            }
        ]
    })

    await User.create({
        email: 'user@gmail.com',
        password: '12321',
        token: nanoid(),
        role: 'user'
    }, {
        email: 'limon@gmail.com',
        password: '12321',
        token: nanoid(),
        role: 'admin'
    })

    await mongoose.connection.close();
};

run().catch(e => console.error(e));