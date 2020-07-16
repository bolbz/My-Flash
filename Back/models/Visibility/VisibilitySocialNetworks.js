const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Création d'un schéma avec ses propriétés, chacunes ayant un type et une valeur par défaut.
//La propriété "user" correspond à l'id d'un utilisateur permettant ainsi de lier les utilisateurs avec leurs données.
//En bas : définition d'un modèle par rapport au schéma
const VisibilitySocialNetworksSchema = new Schema({
    title: {
        type: String,
        default: "Réseaux Sociaux"
    },
    profile: {
        type: String,
        default: ""
    },
    "Facebook": {
        type: Boolean,
        default: false
    },
    "Instagram": {
        type: Boolean,
        default: false
    },
    "Twitter": {
        type: Boolean,
        default: false
    },
    "LinkedIn": {
        type: Boolean,
        default: false
    },
    "Youtube": {
        type: Boolean,
        default: false
    },
    "Skype": {
        type: Boolean,
        default: false
    },
    "Discord": {
        type: Boolean,
        default: false
    },
    "Shapr": {
        type: Boolean,
        default: false
    },
    "Twitch": {
        type: Boolean,
        default: false
    },
    "Snapshat": {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

const VisibilitySocialNetworks = mongoose.model('VisibilitySocialNetworks', VisibilitySocialNetworksSchema);

module.exports = VisibilitySocialNetworks;