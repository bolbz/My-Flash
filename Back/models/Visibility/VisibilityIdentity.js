const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Création d'un schéma avec ses propriétés, chacunes ayant un type et une valeur par défaut.
//La propriété "user" correspond à l'id d'un utilisateur permettant ainsi de lier les utilisateurs avec leurs données.
//En bas : définition d'un modèle par rapport au schéma
const VisibilityIdentitySchema = new Schema({
    title: {
        type: String,
        default: "Identité"
    },
    profile: {
        type: String,
        default: ""
    },
    "Pseudo": {
        type: Boolean,
        default: false
    },
    "Nom de naissance": {
        type: Boolean,
        default: false
    },
    "Nom d'usage": {
        type: Boolean,
        default: false
    },
    "Prénom": {
        type: Boolean,
        default: false
    },
    "Prénoms suivants": {
        type: Boolean,
        default: false
    },
    "Date de naissance": {
        type: Boolean,
        default: false
    },
    "Lieu de naissance": {
        type: Boolean,
        default: false
    },
    "Sexe": {
        type: Boolean,
        default: false
    },
    "Main dominante": {
        type: Boolean,
        default: false
    },
    "Taille": {
        type: Boolean,
        default: false
    },
    "Poids": {
        type: Boolean,
        default: false
    },
    "Yeux": {
        type: Boolean,
        default: false
    },
    "Cheveux": {
        type: Boolean,
        default: false
    },
    "Signe particulier": {
        type: Boolean,
        default: false
    },
    "Nationalité": {
        type: Boolean,
        default: false
    },
    "Status": {
        type: Boolean,
        default: false
    },
    "Nombre d'enfants": {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

const VisibilityIdentity = mongoose.model('VisibilityIdentities', VisibilityIdentitySchema);

module.exports = VisibilityIdentity;