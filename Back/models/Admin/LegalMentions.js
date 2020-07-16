const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Création d'un schéma avec ses propriétés, chacunes ayant un type et une valeur par défaut.
//En bas : définition d'un modèle par rapport au schéma

const LegalMentionsSchema = new Schema({
    title: {
        type: String,
        default: "Mentions Légales"
    },
    text: {
        type: String,
        default: ""
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'admins'
    }
});

const LegalMentions = mongoose.model('LegalMentions', LegalMentionsSchema);

module.exports = LegalMentions;
