const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Création d'un schéma avec ses propriétés, chacunes ayant un type et une valeur par défaut.
//La propriété "user" correspond à l'id d'un utilisateur permettant ainsi de lier les utilisateurs avec leurs données.
//En bas : définition d'un modèle par rapport au schéma
const VisibilityPresentationSchema = new Schema({
    title: {
        type: String,
        default: "Présentation"
    },
    profile: {
        type: String,
        default: ""
    },
    "Présentation": {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

const VisibilityPresentation = mongoose.model('VisibilityPresentation', VisibilityPresentationSchema);

module.exports = VisibilityPresentation;