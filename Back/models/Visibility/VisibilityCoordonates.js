const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Création d'un schéma avec ses propriétés, chacunes ayant un type et une valeur par défaut.
//La propriété "user" correspond à l'id d'un utilisateur permettant ainsi de lier les utilisateurs avec leurs données.
//En bas : définition d'un modèle par rapport au schéma
const VisibilityCoordonatesSchema = new Schema({
    title: {
        type: String,
        default: "Coordonnées"
    },
    profile: {
        type: String,
        default: ""
    },
    "Adresse": {
        type: Boolean,
        default: false
    },
    "Complément d'adresse": {
        type: Boolean,
        default: false
    },
    "Code postal": {
        type: Boolean,
        default: false
    },
    "Ville": {
        type: Boolean,
        default: false
    },
    "Pays": {
        type: Boolean,
        default: false
    },
    "Téléphone fixe": {
        type: Boolean,
        default: false
    },
    "Téléphone portable": {
        type: Boolean,
        default: false
    },
    "Email": {
        type: Boolean,
        default: false
    },
    "Site web": {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

const VisibilityCoordonates = mongoose.model('VisibilityCoordonates', VisibilityCoordonatesSchema);

module.exports = VisibilityCoordonates;