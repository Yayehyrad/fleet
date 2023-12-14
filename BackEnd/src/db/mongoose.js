const mongoose = require("mongoose");

const Url = process.env.MONGOURL || "";
console.log(Url);

mongoose.connect(Url, { useNewUrlParser: true });
