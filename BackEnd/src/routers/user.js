const express = require("express");
const User = require("../models/user");
const UserVerification = require("../models/userVerification");
const Otp = require("../models/otp");
const Activity = require("../models/activity");
const decryptWithPrivateKey = require("../utils/decryptWithPrivateKey");

const auth = require("../middleware/auth");
const manager_auth = require("../middleware/manager_auth");
const admin_auth = require("../middleware/admin_auth");
const validateUserInput = require("../middleware/validator");

const router = new express.Router();
const sendEmail = require("../helper/mail");
const check_attempt = require("../middleware/check_attempt");
const user = require("./user.docs");
router.get("/users/all", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(400).json("message", err.message);
  }
});

router.post("/users", validateUserInput, async (req, res) => {
  const user = new User(req.body);
  try {
    //save user
    await user.save();
    //send email to the user with a confirmation link
    const userVerification = new UserVerification({
      userId: user._id,
    });
    //save verification
    await userVerification.save();
    const token = await user.generateAuthToken();
    const vtoken = await userVerification.generateAuthToken();
    // send email
    const data = {
      name: user.name,
      email: user.email,
      verificationToken: vtoken,
    };
    await sendEmail(data);

    res.status(201).send({ user, token, userVerification, vtoken });

    const payload = {
      description: "Registration of a new user",
      user_name: req.body.user_name,
      timestamps: Date.now(),
      Ip: req.ip,
    };

    const activiy = new Activity(payload);
    await activiy.save();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// async function validateHuman(token) {
//   const secret = " ";
//   try {
//     const response = await fetch(
//       `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
//       { method: "POST" }
//     );
//   } catch (e) {
//     console.log(e);
//   }
//   const data = await response.json();

//   return data.success;
// }
router.post("/user/login", async (req, res) => {
  try {
    // const human = await validateHuman(req.body.token);
    // if (!human) {
    //   throw new Error("Not Human");
    // }
    const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC1DiED8/8jQi2c
qGe7OMGR89Z3BNxAUgbYd9okArK53A6j3b2pVEkQ/1b/ap5XdDoK4a7qr1kSFMyZ
p30eObtsfrcdXsFUrR7/tJ5sz2x7i9+u0c2HyVeT79A0Fvyexw77nv104y767QwS
XOaWz3p9F8UU7gmNFzobKmW6F4ufmQMudHuKKaQR9gWLn24rT9HCiQemZlwMy5x0
fsrPj3l5sf40CprVRHzeKl5ki8b3yD600BPfWu3I6fKcYUVVmlXUrNNBvpX0SPhq
ESaChDm+iwNc/pE4oRMmRrDx2CmAMlRDFSTPhfqGOhjT256hvjAE5BsR1hReD6rT
Kgz6NbIDAgMBAAECggEAFwYa8LPAiC1MO5W2yzomc3b8mNoHYC6OLEzhcp7dN4Fi
Yzg5fCT5va2a1JQsWpavIt8cLT/rJb97XTbNVGCnEt7yTkvUbf4t6PqBAvlFpFhf
M43+gvv5pRhj85vQuCg8IYdQV+LkAIjQdi1WLWto+ithpo22rTh87SNxGD8SRFMr
2thdE0N8+1AadqyMTweYnTdNTciqH6sxXuLPGWGMVL9ttsIbl//9rtiNR13YwKDF
IIldK/ioPXJkv+fuxZRHOseiJ9/YepN3fospMoo5O2VPu8s6FxKYOKN/XSh/1rsy
pzClhdxKTyXTkofkx+Zgj4t9gIEGMFRzhpC7bpxdUQKBgQDwg0EwAr1ZYc+hvjvB
XsvILH2vdl/Ley0qeN0GMf1NCNhaoRlLnmL7CtsT1qShvskQKR0hL74NzOxXn0N1
lLm/GmHP4Yj1SoXUv1bW3ij9ltWIyst6E7wNi7HhaqfYaln8xYj2NWsL0cZ+ZNVz
NqfIkh7kPeEdQpyQFuwdkEKkRQKBgQDAtr5TOEb+PPy+ZSoUg6gcXDyJu3v4UovM
abfS3NRJXh6thU87nP+udokZCkY+RgkkTq3L4SJ9YLmHgS5RFtqqierG8FYN8XVr
+cZMhJy7VmID5+72Y9g0Ij0UzoTh2ZtbCq98PYc8vqVIOPpFuAe0+1bIfZ/bPEw4
cEzdMBV1pwKBgQDaymwoorVhdCsPtiBh3jx/EoobbhHi52DE/EIEesE0rNE0UMzU
D3d3a/6zY1VMlmQNwXjwUaAQqdRuOUGC2xLGF9fW5hJTIcHxMUZsHJkpZ2dFE0Za
/Uza/bOJnh6mLslBuujHIP0KOYDaRhwuvQ+Q0+wqMWhx18DZCyEsG6mkCQKBgBXi
Koaks1sXbdPpBPhDYwmlZ7J0OcWfCgTyVE97iBe0umMV6kNotpgHGdZgFk3oAg2/
aXjnXdVC8I50mt/WaopHEwP4Mq1up9jVCjGSNYIIcyTiZ35PJDP3V1xPf0NuRHf4
JKlFC2BYfchPwAu+tBFXISmvKkHo/PbDuda8KROtAoGAeTclFsfIj+e/9jW/7iI8
Eajs1uzfrnrC0JKUKcoU6m0oWP28Oiljkhh7Q07uJJH3dd8VvsggBjOXmz/XHO5d
bppUCeMn/SbDuD7g2cnPDH/rkhwfm7+Q4RZQYE2f4wgXSwYZO0naLHurqLX3JKhJ
ye5UxlAOde5+vFRplkX91NI=
-----END PRIVATE KEY-----`;
    const privateKeyObject = crypto.createPrivateKey({
      key: privateKey,
      format: "pem",
    });
    const password = await decryptWithPrivateKey(
      privateKeyObject,
      req.body.password
    );
    const user = await User.findByCredentias(req.body.email, req.body.password);

    const token = await user.generateAuthToken();

    const payload = {
      description: "Login Activity",
      user_name: user.user_name,
      timestamps: Date.now(),
      Ip: req.ip,
    };

    const activiy = new Activity(payload);
    await activiy.save();

    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/users/me", auth, async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (e) {
    res.status(500).send(error.message);
  }

  //   res.status(200).send(user);
  // } catch (e) {
  //   res.status(500).send(e.message);
  // }
});
router.post("/sendemail", async (req, res) => {
  const data = { name: "yayeh" };
  console.log(data);
  await sendEmail(data);
  res.status(200).send("success");
});
router.get("/user/verify", async (req, res) => {
  //verify
  // const { vtoken } = req.query;
  // const decoded = jwt.verify(vtoken, "fightlikeurthethirdmonkey");
  // const user = await userVerification.findOne({
  //   _id: decoded._id,
  //   verificationToken: vtoken,
  // });
  try {
    const verification = await UserVerification.verify(req.query);
    if (verification.status == "success") {
      const user = await User.findById({ _id: verification.id });
      user.status = "active";
      await user.save();

      res.redirect(`http://localhost:3000/`);
      // res.status(200).send("success");
    } else {
      throw new Error(verification.message);
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});
// router.post("/user/generateotp", async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });
//   try {
//     //send email to the user with a confirmation link
//     const otp = new Otp({
//       userId: user._id,
//     });
//     //save otp
//     await otp.save();
//     // verification token
//     const generatedOtp = await otp.generateOtp();
//     // send email
//     const data = {
//       name: user.name,
//       email: user.email,
//       otpVerification: generatedOtp,
//     };
//     await sendEmail(data);
//   }catch(e){
//     res.status()
//   }
// })
router.post("/user/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      console.log(token, req.token);
      return token.token !== req.token;
    });
    await req.user.save();
    const payload = {
      description: "Logout Activity",
      user_name: req.user.user_name,
      timestamps: Date.now(),
      Ip: req.ip,
    };

    const activiy = new Activity(payload);
    await activiy.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});
router.post("/user/logoutFromAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    req.send();
  } catch (e) {
    res.status(501).send();
  }
});

router.patch("/user/update", auth, async (req, res) => {
  const update = ["name", "age", "email", "password"];
  const updates = Object.keys(req.body);
  const isVal = updates.every((upd) => {
    return update.includes(upd);
  });
  if (!isVal) {
    return res.status(400).send({ error: "invaid action" });
  }
  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });
    await req.user.save();
    if (!req.user) {
      return res.status(404).send({ error: "not found" });
    }
    res.status(200).send(req.user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
router.delete("/user/delete", auth, admin_auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
router.delete("/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id); //here
    if (!user) {
      return res.status(404).send("not found");
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
router.post("/user/verifyotp", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  try {
    //send email to the user with a confirmation link
    const otp = new Otp({
      userId: user._id,
    });
    //save otp
    await otp.save();
    // verification token
    const generatedOtp = await otp.generateOtp();
    // send email
    const data = {
      name: user.name,
      email: user.email,
      otpVerification: generatedOtp,
    };
    await sendEmail(data);

    res.status(201).send({ s: "success", data });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.post("/user/verifyotp/:id", async (req, res) => {
  try {
    const otp = await Otp.findById(req.params.id);
    if (!otp) {
      return res.status(404).send("OTP not found");
    }
    const currentDate = new Date();
    if (otp.expiresAt < currentDate) {
      return res.status(400).send("OTP is expired");
    }
    if (otp.otpVerification !== req.body.code) {
      return res.status(400).send("Invalid OTP verification code");
    }
    const user = await User.findById(otp.userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const authToken = await user.generateAuthToken();

    res.status(200).send({ user, authToken });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
