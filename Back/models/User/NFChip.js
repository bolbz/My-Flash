const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Création d'un schéma avec ses propriétés, chacunes ayant un type et une valeur par défaut.
//En bas : définition d'un modèle par rapport au schéma
const NFChipSchema = new Schema({
    chipId: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

const NFChip = mongoose.model('NFChips', NFChipSchema);

module.exports = NFChip;