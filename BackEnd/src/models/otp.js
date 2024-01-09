const mongoose = require("mongoose");
const otpGenerator = require("otp-generator");

const otpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  otpVerification: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: () => Date.now() + 4 * 60 * 1000, // expires in 4 minutes
  },
});

console.log(
  otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  })
);

// gernerates otp
otpSchema.methods.generateOtp = async function () {
  otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });

  this.otpVerification = otp;
  await this.save();
  return this;
};
// otpSchema.statics.verify = async (query) => {
//   const { token } = query;
//   // console.log(token, query);
//   try {
//     const decoded = jwt.verify(token, "fightlikeurthethirdmonkey");
//     // console.log(decoded);

//     const verification = await UserVerification.findOne({
//       _id: decoded._id,
//       verificationToken: token,
//     });

//     // console.log(verification);

//     if (!verification) {
//       throw new Error("Unable to verify");
//     }
//     if (verification.isVerified) {
//       throw new Error("verified user");
//     }
//     verification.isVerified = true;
//     await verification.save();
//     return { message: "verified", id: verification.userId, status: "success" };
//   } catch (e) {
//     return e;
//   }
// };

const Otp = mongoose.model("Otp", otpSchema);

module.exports = Otp;
