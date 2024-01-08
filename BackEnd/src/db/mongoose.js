const mongoose = require("mongoose");
require("dotenv").config();
const Url = process.env.MONGOURL || "";

//localhost:27017/fleet

// add an array

mongoose.connect(Url, { useNewUrlParser: true });
