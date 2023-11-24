const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");

const Exchanges = new Schema({
    exchange_id: {
        type: String
    },
    website: {
        type: String,
    },
    name: {
        type: String,
    },
    data_quote_start: {
        type: Date
    },
    data_quote_end: {
        type: Date
    },
    data_orderbook_start: {
        type: Date
    },
    data_orderbook_end: {
        type: Date,
    },
    data_trade_start: {
        type: Date,
    },
    data_trade_end: {
        type: Date,
    },
    data_symbols_count: {
        type: String,
    },
    volume_1hrs_usd: {
        type: String,
    },
    url: {
        type: String,
    },
    volume_1day_usd: {
        type: String,
    },
    volume_1mth_usd: {
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



module.exports = model('Exchanges', Exchanges);