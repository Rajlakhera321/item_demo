const { Schema, model } = require("mongoose");

const itemSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    quantity: {
        type: Number
    },
    price: {
        type: Number
    },
    date: {
        type: String
    },
    image: {
        type: String
    }
}, { timestamps: true });

module.exports = model('item', itemSchema);