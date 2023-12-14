const mongoose = require("mongoose")
const vaidator = require('validator') 
const  bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require("./task")

const userSchima = new mongoose.Schema({
    name : {
        type:String,
        required:true,
        trim:true  
    },
    email : {
        type:String,
        required:true ,
        unique:true,
        trim:true,
        lowercase:true,
        Validate(value){
            if (!vaidator.isEmail(value)){
                throw new Error("nt email")
            }
        }
    },
    age : {
        type:Number
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlenght:6
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

userSchima.virtual('tasks' , {
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

userSchima.methods.generateAuthToken = async function(){
          const token = jwt.sign({_id:this._id.toString()},'fightlikeurthethirdmonkey' )
          this.tokens = this.tokens.concat({token})
          await this.save()
          return token
}
userSchima.methods.toJSON =  function(){
    const userObject = this.toObject()
    
    delete userObject.password
    delete userObject.tokens

    return userObject
}
userSchima.statics.findByCredentias = async (email , password)=>{
    
            const user = await User.findOne({
                email : email
            })
            if(!user){
                throw new Error("Unable to login")
            }
            const isMatch = await bcrypt.compare(password , user.password)
            if(!isMatch){
                throw new Error(" invalid email or password")
            }
            return user

}



userSchima.pre("save", async function(next){
            if(this.isModified('password')){
                this.password = await bcrypt.hash(this.password , 8)
            }
            next()
})

userSchima.pre('remove' , async function(next){
    await Task.deleteMany({owner:this._id})
    next()
})


const User = mongoose.model('User' , userSchima
)

module.exports = User