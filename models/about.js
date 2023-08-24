const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//create collection
const AboutModel = mongoose.model("about", AboutSchema);
//                                     ^ collection name

module.exports = AboutModel;
