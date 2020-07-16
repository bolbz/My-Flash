const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

//Création d'un schéma avec ses propriétés, chacunes ayant un type, une valeur par défaut et/ou
// un booleen pour savoir si une propriété est requise ou non.

//En bas : définition d'un modèle par rapport au schéma

const PartnerSchema = new Schema({
    index : {
        type: Number,
    },
    name: {
        type: String,
        required: true
    },
     topImageData: {
        type: String,
        required: true
    },
});

PartnerSchema.plugin(AutoIncrement, {id:'order_seq_partner',inc_field: 'index'});
const Partner = mongoose.model('partners', PartnerSchema);



module.exports = Partner;