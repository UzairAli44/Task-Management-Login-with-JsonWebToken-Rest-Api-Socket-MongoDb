const mongoose = require('mongoose');
const env = require('../environment/env');

mongoose.connect(env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});