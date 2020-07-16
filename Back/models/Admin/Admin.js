const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    
    pseudo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String
    },

});

const Admin = mongoose.model('admins', AdminSchema);

module.exports = Admin;