const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const clientSchema = new Schema(
  {
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  colorPalette: {
    type: Array,
  }
});
const Client = model("Client", clientSchema);

module.exports = Client;
