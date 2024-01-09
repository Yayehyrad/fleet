const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userVerificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  verificationToken: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //   expiresAt: {
  //     type: Date,
  //     default: () => Date.now() + 4 * 60 * 1000, // expires in 4 minutes
  //   },
});

userVerificationSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign(
    { _id: this._id.toString() },
    "fightlikeurthethirdmonkey"
  );
  this.verificationToken = token;
  await this.save();
  return token;
};
userVerificationSchema.statics.verify = async (query) => {
  const { token } = query;
  // console.log(token, query);
  try {
    const decoded = jwt.verify(token, "fightlikeurthethirdmonkey");
    // console.log(decoded);

    const verification = await UserVerification.findOne({
      _id: decoded._id,
      verificationToken: token,
    });

    // console.log(verification);

    if (!verification) {
      throw new Error("Unable to verify");
    }
    if (verification.isVerified) {
      throw new Error("verified user");
    }
    verification.isVerified = true;
    await verification.save();
    return { message: "verified", id: verification.userId, status: "success" };
  } catch (e) {
    return e;
  }
};

const UserVerification = mongoose.model(
  "UserVerification",
  userVerificationSchema
);

module.exports = UserVerification;
