const mongoose = require("mongoose");
require("dotenv").config();
const Url = process.env.MONGOURL || "mongodb+srv://imranhayredin89:p3Xp8z7dwdYKBDyi@cluster0.gpom6d9.mongodb.net/Fleet?retryWrites=true&w=majority";


try{
    mongoose.connect(Url, { useNewUrlParser: true });
    console.log("connected")


}

catch(e)
{
    console.log(e)
}


