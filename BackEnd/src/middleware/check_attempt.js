const User = require('../models/user')
const jwt = require('jsonwebtoken')

const check_attempt = async (req,res,next)=>{
    try{
      
        const user = req.token

        res.send(user)


       /* if(user.attempts > 3){
            await User.findOneAndUpdate({"user_name":user.user_name},{"status":"blocked"})
            return res.status(400).send({error : "Your account is blocked"})
            
           
        }*/
       
       // req.token = token
       // req.user = user
       // next()
    }catch(e){
        res.status(401).send({error : e.message})
    }
}

















module.exports = check_attempt
