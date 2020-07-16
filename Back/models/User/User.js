const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

//Création d'un schéma avec ses propriétés, chacunes ayant un type, une valeur par défaut et/ou
// un booleen pour savoir si une propriété est requise ou non.
//En bas : définition d'un modèle par rapport au schéma
const UserSchema = new Schema({

    index: {
        type: Number,
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    avatar: {
        type: String
    },
    apikey: {
        type: String,
        required: true
    },
    token: {
        type: String,
    },
    tokenExpires: {
        type: Date
    }
});
UserSchema.plugin(AutoIncrement, { id: 'order_seq', inc_field: 'index' });
const User = mongoose.model('users', UserSchema);

module.exports = User;