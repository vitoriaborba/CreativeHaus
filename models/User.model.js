const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  clients: [{type: Schema.Types.ObjectId, ref: 'Client'}]
});

const User = model("User", userSchema);

module.exports = User;
