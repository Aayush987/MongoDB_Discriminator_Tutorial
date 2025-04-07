const mongoose = require('mongoose');

const baseOptions = {
    discriminatorKey: 'itemtype',
    collection: 'items',
}

const BaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
}, baseOptions);

module.exports = mongoose.model('Base',BaseSchema);