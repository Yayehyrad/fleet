const mongoose = require("mongoose");

const keyPairSchema = new mongoose.Schema({
  publicKey: {
    type: String,
    required: true,
  },
  privateKey: {
    type: String,
    required: true,
  },
});

const KeyPair = mongoose.model("KeyPair", keyPairSchema);

module.exports = KeyPair;
