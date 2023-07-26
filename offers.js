const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    
    offerName: {
        required: true,
        type: String
    },
    offerDetail: {
        required: true,
        type: String
    }
})
module.exports = mongoose.model('Offerdata', dataSchema);