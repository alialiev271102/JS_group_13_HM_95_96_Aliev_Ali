const mongoose = require('mongoose');
const config = require("./config");
const User = require("./models/User");
const {nanoid} = require("nanoid");

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    await User.create({
        email: 'user@gmail.com',
        password: '1@345qWert',
        token: nanoid(),
        role: 'user'
    }, {
        email: 'limon@gmail.com',
        password: '1@345qWert',
        token: nanoid(),
        role: 'admin'
    })

    await mongoose.connection.close();
};

run().catch(e => console.error(e));