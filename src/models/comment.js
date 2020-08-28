const {Schema,model} = require('mongoose');

const CommentSchema = new Schema({
    email: {type: String},
    name: {type: String},
    comment: {type: String},
    timestamp: {type: Date, default: Date.now},
    imageId: {type: Schema.ObjectId},
    gravatar: {type: String}
});

module.exports = model('Comment',CommentSchema);