const mongoose = require("mongoose");
const vaidator = require("validator");

const fleetSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
    trim: true,
    Validate(value) {
      if (value.length <= 5 && value.length >= 20) {
        throw new Error("length doesnt match");
      }
    },
  },
  licensePlate: {
    type: String,
    required: true,
    trim: true,
    Validate(value) {
      if (value.length <= 5 && value.length >= 20) {
        throw new Error("length doesnt match");
      }
    },
  },
  tags: {
    type: String,
    required: true,
    trim: true,
    Validate(value) {
      if (value.length <= 5 && value.length >= 20) {
        throw new Error("length doesnt match");
      }
    },
  },
  LOM: {
    type: String,
    required: true,
    trim: true,
    Validate(value) {
      if (value.length <= 5 && value.length >= 20) {
        throw new Error("length doesnt match");
      }
    },
  },
  date_LOM: {
    type: String,
    required: true,
    trim: true,
    Validate(value) {
      if (value.length <= 5 && value.length >= 20) {
        throw new Error("length doesnt match");
      }
    },
  },
  chassieNumber: {
    type: String,
    required: true,
    trim: true,
    Validate(value) {
      if (value.length <= 5 && value.length >= 20) {
        throw new Error("length doesnt match");
      }
    },
  },
  seatNumber: {
    type: String,
    required: true,
    trim: true,
    Validate(value) {
      if (value.length <= 5 && value.length >= 20) {
        throw new Error("length doesnt match");
      }
    },
  },
  doorsNumber: {
    type: String,
    required: true,
    trim: true,
    Validate(value) {
      if (value.length <= 5 && value.length >= 20) {
        throw new Error("length doesnt match");
      }
    },
  },
  date: {
    type: String,
    required: true,
    trim: true,
    Validate(value) {
      if (value.length <= 5 && value.length >= 20) {
        throw new Error("length doesnt match");
      }
    },
  },
  color: {
    type: String,
    required: true,
    default: "red",
    trim: true,
    Validate(value) {
      if (value.length <= 5 && value.length >= 20) {
        throw new Error("length doesnt match");
      }
    },
  },
});

// userSchima.methods.generateAuthToken = async function(){
//           const token = jwt.sign({_id:this._id.toString()},'fightlikeurthethirdmonkey' )
//           this.tokens = this.tokens.concat({token})
//           await this.save()
//           return token
// }
// userSchima.methods.toJSON =  function(){
//     const userObject = this.toObject()

//     delete userObject.password
//     delete userObject.tokens

//     return userObject
// }
// userSchima.statics.findByCredentias = async (email , password)=>{

//             const user = await User.findOne({
//                 email : email
//             })
//             if(!user){
//                 throw new Error("Unable to login")
//             }
//             const isMatch = await bcrypt.compare(password , user.password)
//             if(!isMatch){
//                 throw new Error(" invalid email or password")
//             }
//             return user

// }

// userSchima.pre("save", async function(next){
//             if(this.isModified('password')){
//                 this.password = await bcrypt.hash(this.password , 8)
//             }
//             next()
// })

// userSchima.pre('remove' , async function(next){
//     await Task.deleteMany({owner:this._id})
//     next()
// })

const Fleet = mongoose.model("Fleet", fleetSchema);

module.exports = Fleet;
