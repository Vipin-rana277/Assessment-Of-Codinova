const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");

const Icons = new Schema({
    exchange_id: {
        type: String
    },
    url: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
})



module.exports = model('Icons', Icons);