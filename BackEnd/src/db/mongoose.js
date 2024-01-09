const mongoose = require("mongoose");
require("dotenv").config();
const Url = process.env.MONGOURL || "";


try{
    mongoose.connect(Url, { useNewUrlParser: true });
    console.log("connected")


}

catch(e)
{
    console.log(e)
}


