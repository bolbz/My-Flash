const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Création d'un schéma avec ses propriétés, chacunes ayant un type et une valeur par défaut.
//La propriété "user" correspond à l'id d'un utilisateur permettant ainsi de lier les utilisateurs avec leurs données.
//En bas : définition d'un modèle par rapport au schéma
const ProfessionalSchema = new Schema({
    title: {
        type: String,
        default: "Professionnel"
    },
    "Métier": {
        type: String,
        default: ""
    },
    "Société": {
        type: String,
        default: ""
    },
    "Dernière expérience professionnelle": {
        type: String,
        default: ""
    },
    "Dernière formation effectuée": {
        type: String,
        default: ""
    },
    "Langues": {
        type: String,
        default: ""
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

const Professional = mongoose.model('Professional', ProfessionalSchema);

module.exports = Professional;