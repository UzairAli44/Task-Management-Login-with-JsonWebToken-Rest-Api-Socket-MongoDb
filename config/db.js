const mongoose = require('mongoose');
const env = require('../environment/env');

mongoose.connect('mongodb://localhost:27017/task_management_db').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});