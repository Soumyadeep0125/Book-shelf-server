const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    
    category: {
        required: true,
        type: String,
    },
    imageUrl: {
        type: String,
    }
   
})
module.exports = mongoose.model('Categories', dataSchema);