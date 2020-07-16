const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Création d'un schéma avec ses propriétés, chacunes ayant un type et une valeur par défaut.
//La propriété "user" correspond à l'id d'un utilisateur permettant ainsi de lier les utilisateurs avec leurs données.
//En bas : définition d'un modèle par rapport au schéma
const VisibilityHobbiesSchema = new Schema({
    title: {
        type: String,
        default: "Centres d'intéret"
    },
    profile: {
        type: String,
        default: ""
    },
    "Livres": {
        type: Boolean,
        default: false
    },
    "Films": {
        type: Boolean,
        default: false
    },
    "Séries": {
        type: Boolean,
        default: false
    },
    "Musiques": {
        type: Boolean,
        default: false
    },
    "Sports": {
        type: Boolean,
        default: false
    },
    "Voyages": {
        type: Boolean,
        default: false
    },
    "Jeux-vidéos": {
        type: Boolean,
        default: false
    },
    "Artistes": {
        type: Boolean,
        default: false
    },
    "Auteurs": {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

const VisibilityHobbies = mongoose.model('VisibilityHobbies', VisibilityHobbiesSchema);

module.exports = VisibilityHobbies;