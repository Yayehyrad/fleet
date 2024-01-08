const mongoose = require("mongoose");

const Url = process.env.MONGOURL || "";
console.log(Url);

//localhost:27017/fleet

// add an array

mongoose.connect(Url, { useNewUrlParser: true });
