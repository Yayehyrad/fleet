const express = require("express");
const User = require("../models/user");
const UserVerification = require("../models/userVerification");
const Otp = require("../models/otp");
const Activity = require("../models/activity");

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
