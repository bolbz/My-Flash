const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Création d'un schéma avec ses propriétés, chacunes ayant un type et une valeur par défaut.
//La propriété "user" correspond à l'id d'un utilisateur permettant ainsi de lier les utilisateurs avec leurs données.
//En bas : définition d'un modèle par rapport au schéma
const VisibilityProfessionalSchema = new Schema({
    title: {
        type: String,
        default: "Professionnel"
    },
    profile: {
        type: String,
        default: ""
    },
    "Métier": {
        type: Boolean,
        default: false
    },
    "Société": {
        type: Boolean,
        default: false
    },
    "Dernière expérience professionnelle": {
        type: Boolean,
        default: false
    },
    "Dernière formation effectuée": {
        type: Boolean,
        default: false
    },
    "Langues": {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

const VisibilityProfessional = mongoose.model('VisibilityProfessional', VisibilityProfessionalSchema);

module.exports = VisibilityProfessional;