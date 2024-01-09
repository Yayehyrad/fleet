const User = require('../models/user')
const Activity = require('../models/activity')
const jwt = require('jsonwebtoken')


const driver_auth = async(req,res,next)=>{
    try {
        const token = req.header('Authorization').replace('Bearer ' , "")
        const decoded = jwt.verify(token , 'fightlikeurthethirdmonkey')
        const user = await User.findOne({_id:decoded._id , 'tokens.token':token})

        if(decoded.role !== "Driver")
        {
            const payload = {
                "description":"A user tried to access Driver specific routes without privilage",
                "user_name":decoded.user_name,
                "timestamps":Date.now(),
                "Ip":req.ip
            }
    
            const activiy = new Activity(payload)
            await activiy.save()

            return res.status(401).send({ error: "You are not a driver!"})

        }
        req.token = token
        req.user = user
        next()

        
    } catch (error) {

        res.status(400).json({error:"unauthorized"})

        
    }

}

module.exports = driver_auth