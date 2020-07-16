const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Création d'un schéma avec ses propriétés, chacunes ayant un type et une valeur par défaut.
//La propriété "user" correspond à l'id d'un utilisateur permettant ainsi de lier les utilisateurs avec leurs données.
//En bas : définition d'un modèle par rapport au schéma
const VisibilityHealthSchema = new Schema({
    title: {
        type: String,
        default: "Santé"
    },
    profile: {
        type: String,
        default: ""
    },
    "Allergies": {
        type: Boolean,
        default: false
    },
    "Traitement": {
        type: Boolean,
        default: false
    },
    "Opérations": {
        type: Boolean,
        default: false
    },
    "Groupe Sanguin": {
        type: Boolean,
        default: false
    },
    "Maladies": {
        type: Boolean,
        default: false
    },
    "Contact d'urgence": {
        type: Boolean,
        default: false
    },
    "Sécurité Sociale": {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

const VisibilityHealth = mongoose.model('VisibilityHealth', VisibilityHealthSchema);

module.exports = VisibilityHealth;