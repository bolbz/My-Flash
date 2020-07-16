const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Création d'un schéma avec ses propriétés, chacunes ayant un type et une valeur par défaut.
//La propriété "user" correspond à l'id d'un utilisateur permettant ainsi de lier les utilisateurs avec leurs données.
//En bas : définition d'un modèle par rapport au schéma
const CoordonatesSchema = new Schema({
    title: {
        type: String,
        default: "Coordonnées"
    },
    "Adresse": {
        type: String,
        default: ""
    },
    "Complément d'adresse": {
        type: String,
        default: ""
    },
    "Code postal": {
        type: String,
        default: ""
    },
    "Ville": {
        type: String,
        default: ""
    },
    "Pays": {
        type: String,
        default: ""
    },
    "Téléphone fixe": {
        type: String,
        default: ""
    },
    "Téléphone portable": {
        type: String,
        default: ""
    },
    "Email": {
        type: String,
        default: ""
    },
    "Site web": {
        type: String,
        default: ""
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

const Coordonates = mongoose.model('Coordonates', CoordonatesSchema);

module.exports = Coordonates;