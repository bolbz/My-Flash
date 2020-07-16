const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Création d'un schéma avec ses propriétés, chacunes ayant un type et une valeur par défaut.
//La propriété "user" correspond à l'id d'un utilisateur permettant ainsi de lier les utilisateurs avec leurs données.
//En bas : définition d'un modèle par rapport au schéma
const SocialNetworksSchema = new Schema({
    title: {
        type: String,
        default: "Réseaux Sociaux"
    },
    "Facebook": {
        type: String,
        default: ""
    },
    "Instagram": {
        type: String,
        default: ""
    },
    "Twitter": {
        type: String,
        default: ""
    },
    "LinkedIn": {
        type: String,
        default: ""
    },
    "Youtube": {
        type: String,
        default: ""
    },
    "Skype": {
        type: String,
        default: ""
    },
    "Discord": {
        type: String,
        default: ""
    },
    "Shapr": {
        type: String,
        default: ""
    },
    "Twitch": {
        type: String,
        default: ""
    },
    "Snapshat": {
        type: String,
        default: ""
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

const SocialNetworks = mongoose.model('SocialNetworks', SocialNetworksSchema);

module.exports = SocialNetworks;