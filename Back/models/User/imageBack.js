const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BandeauSchema = new Schema({
    bandeauName: {
        type: String,
        default: "none",
        required: true
    },
    bandeauData: {
        type: String,
        required: true
    },
    user : {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
});

const ImageBack = mongoose.model('ImageBack', BandeauSchema);

module.exports = ImageBack;