const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Création d'un schéma avec ses propriétés, chacunes ayant un type et une valeur par défaut.
//La propriété "user" correspond à l'id d'un utilisateur permettant ainsi de lier les utilisateurs avec leurs données.
//En bas : définition d'un modèle par rapport au schéma
const HealthSchema = new Schema({
    title: {
        type: String,
        default: "Santé"
    },
    "Allergies": {
        type: String,
        default: ""
    },
    "Traitement": {
        type: String,
        default: ""
    },
    "Opérations": {
        type: String,
        default: ""
    },
    "Groupe Sanguin": {
        type: String,
        default: ""
    },
    "Maladies": {
        type: String,
        default: ""
    },
    "Contact d'urgence": {
        type: String,
        default: ""
    },
    "Sécurité Sociale": {
        type: String,
        default: ""
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

const Health = mongoose.model('Health', HealthSchema);

module.exports = Health;