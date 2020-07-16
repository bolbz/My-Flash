const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Création d'un schéma avec ses propriétés, chacunes ayant un type et une valeur par défaut.
//La propriété "user" correspond à l'id d'un utilisateur permettant ainsi de lier les utilisateurs avec leurs données.
//En bas : définition d'un modèle par rapport au schéma

const ActiveCardsSchema = new Schema({
    Coordonates: {
        type: Boolean,
        default: true
    },
    Identities: {
        type: Boolean,
        default: true
    },
    Health: {
        type: Boolean,
        default: true
    },
     SocialNetworks: {
        type: Boolean,
        default: true
    },
     Professional: {
        type: Boolean,
        default: true
    },
     Hobbies: {
        type: Boolean,
        default: true
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'admins'
    }
});

const Active = mongoose.model('ActiveCards', ActiveCardsSchema);

module.exports = Active;
