const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    imageName: {
        type: String,
        default: "none",
        required: true
    },
    imageData: {
        type: String,
        required: true
    },
    user : {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    avatar : {
        type: Schema.Types.String,
        ref: 'users'
    }
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;