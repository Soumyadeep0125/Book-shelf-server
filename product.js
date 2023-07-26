const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    
    userId:{
        required: true,
        type: String
    },
    category: {
        required: true,
        type: String
    },
    productName: {
        required: true,
        type: String
    },
    productPrice: {
        required: true,
        type: Number
    },
    productDescription: {
        required: true,
        type: String
    },
    productInformation: {
        required: true,
        type: String
    },
    sellerAddress: {
        required: true,
        type: String
    },
    contactNumber: {
        required: true,
        type: Number
    },
    pincode: {
        required: true,
        type: Number
    },
    imageUrl1: {
        required: true,
        type: String
    },
    imageUrl2: {
        required: true,
        type: String
    },
    imageUrl3: {
        required: true,
        type: String
    }
})
module.exports = mongoose.model('ProductData', dataSchema);