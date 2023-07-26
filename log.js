const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    
    bId: {
        required: true,
        type: String, 
    },
    sId: {
        required: true,
        type: String, 
    },
    pName: {
        required: true,
        type: String, 
    },
    pCategory: {
        required: true,
        type: String, 
    },
   
    
})
module.exports = mongoose.model('Purchase Log', dataSchema);