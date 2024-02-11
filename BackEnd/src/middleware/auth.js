const User = require("../models/user");
const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token);
    const decoded = jwt.verify(token, "fightlikeurthethirdmonkey");
    console.log(decoded);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("");
    }
    if (user.status === "pending") {
      return res.status(401).send({ error: "Please Verify Your Email" });
    }
    if (user.status === "blocked") {
      return res
        .status(401)
        .send({ error: "Your account is temporarly blocked" });
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "unAuthorized" });
  }
};

module.exports = auth;
