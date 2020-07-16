const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Création d'un schéma avec ses propriétés, chacunes ayant un type et une valeur par défaut.
//La propriété "user" correspond à l'id d'un utilisateur permettant ainsi de lier les utilisateurs avec leurs données.
//En bas : définition d'un modèle par rapport au schéma
const IdentitySchema = new Schema({
    title: {
        type: String,
        default: "Identité"
    },
    "Pseudo": {
        type: String,
        default: ""
    },
    "Nom de naissance": {
        type: String,
        default: ""
    },
    "Nom d'usage": {
        type: String,
        default: ""
    },
    "Prénom": {
        type: String,
        default: ""
    },
    "Prénoms suivants": {
        type: String,
        default: ""
    },
    "Date de naissance": {
        type: String,    //Date
        default: ""
    },
    "Lieu de naissance": {
        type: String,
        default: ""
    },
    "Sexe": {
        type: String,
        default: ""
    },
    "Main dominante": {
        type: String,
        default: ""
    },
    "Taille": {
        type: String,
        default: ""    //Number
    },
    "Poids": {
        type: String,
        default: ""    //Number
    },
    "Yeux": {
        type: String,
        default: ""
    },
    "Cheveux": {
        type: String,
        default: ""
    },
    "Signe particulier": {
        type: String,
        default: ""
    },
    "Nationalité": {
        type: String,
        default: ""
    },
    "Status": {
        type: String,
        default: ""
    },
    "Nombre d'enfants": {
        type: String,
        default: ""
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

const Identity = mongoose.model('Identities', IdentitySchema);

module.exports = Identity;