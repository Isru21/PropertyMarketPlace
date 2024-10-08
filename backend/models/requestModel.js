const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestSchema = new Schema({
    realestate_name: {
        type: mongoose.Schema.Types.String,
        ref: 'User'
    },
    client_name: {
        type: mongoose.Schema.Types.String,
        ref: 'User'
    },
    clinet_image:{
        type: mongoose.Schema.Types.String,
        ref: 'User'
    },
    realestate_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    clinet_phone:{
        type: mongoose.Schema.Types.String,
        ref: 'User'
    },
    apartment_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Apartment'
    },
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    },
    reply_message: {
        type: String,
    },
    status: {
        type: String, // pending, accepted, rejected
        default: 'pending'
    }
}, {timestamps: true});

module.exports = mongoose.model('Request', requestSchema);