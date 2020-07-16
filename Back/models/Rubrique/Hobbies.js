const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Création d'un schéma avec ses propriétés, chacunes ayant un type et une valeur par défaut.
//La propriété "user" correspond à l'id d'un utilisateur permettant ainsi de lier les utilisateurs avec leurs données.
//En bas : définition d'un modèle par rapport au schéma
const HobbiesSchema = new Schema({
    title: {
        type: String,
        default: "Centres d'intéret"
    },
    "Livres": {
        type: String,
        default: ""
    },
    "Films": {
        type: String,
        default: ""
    },
    "Séries": {
        type: String,
        default: ""
    },
    "Musiques": {
        type: String,
        default: ""
    },
    "Sports": {
        type: String,
        default: ""
    },
    "Voyages": {
        type: String,
        default: ""
    },
    "Jeux-vidéos": {
        type: String,
        default: ""
    },
    "Artistes": {
        type: String,
        default: ""
    },
    "Auteurs": {
        type: String,
        default: ""
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

const Hobbies = mongoose.model('Hobbies', HobbiesSchema);

module.exports = Hobbies;