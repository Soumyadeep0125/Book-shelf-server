const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    
    userId: {
        required: true,
        type: String, 
    },
    firstName: {
        required: true,
        type: String, 
    },
    lastName: {
        required: true,
        type: String, 
    },
    email: {
        required: true,
        type: String, 
    },
    contactNumber: {
        required: true,
        type: Number, 
    },
    address: {
        required: true,
        type: String, 
    },
    city: {
        required: true,
        type: String, 
    },
    state: {
        required: true,
        type: String, 
    },
    country: {
        required: true,
        type: String, 
    },
    pincode: {
        required: true,
        type: Number, 
    },
    
    
})
module.exports = mongoose.model('userDetails', dataSchema);