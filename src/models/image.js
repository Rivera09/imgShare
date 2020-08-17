const mongoose = require("mongoose");
const { Schema } = mongoose;

ImageSchema = new Schema({
  uniqueId: {type: String},
  ext: {type:String},
  title: { type: String },
  description: { type: String },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Image',ImageSchema);