const mongoose = require("mongoose");
const vaidator = require("validator");

const activitySchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  timestamps: true,
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

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
