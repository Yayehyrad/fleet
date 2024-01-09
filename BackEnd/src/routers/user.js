const express = require('express')
const User = require('../models/user') 
const Activity = require('../models/activity')
const auth = require('../middleware/auth')
const manager_auth = require('../middleware/manager_auth')
const admin_auth = require("../middleware/admin_auth")
const validateUserInput = require("../middleware/validator")
const router = new express.Router()
const check_attempt = require("../middleware/check_attempt")


router.post("/users" ,validateUserInput, async (req , res)=>{
    const user = new User(req.body)
    try{
        await  user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user , token})

        const payload = {
            "description":"Registration of a new user",
            "user_name":req.body.user_name,
            "timestamps":Date.now(),
            "Ip":req.ip

        }

        const activiy = new Activity(payload)
        await activiy.save()
    }catch(error){
        res.status(500).send(error.message)
    }    
})
router.post('/user/login' , async (req, res )=>{
    try{
        const user = await User.findByCredentias(req.body.email , req.body.password)
        
        const token = await user.generateAuthToken()

        const payload = {
            "description":"Login Activity",
            "user_name":user.user_name,
            "timestamps":Date.now(),
            "Ip":req.ip
        }

        const activiy = new Activity(payload)
        await activiy.save()

        res.send({user  , token})
    }catch(e){
        res.status(400).send(e.message)
    }
})
router.get('/users/me' , auth , async (req , res)=>{

    try{
        res.status(200).send(req.user)
    }catch(e){
        res.status(500).send(error.message)
    }
})
router.post('/user/logout' , auth , async (req , res)=>{
    try{
         
        req.user.tokens = req.user.tokens.filter((token)=>{
            console.log(token , req.token)
            return token.token !== req.token ;
        })
        await req.user.save()
        const payload = {
            "description":"Logout Activity",
            "user_name":req.user.user_name,
            "timestamps":Date.now(),
            "Ip":req.ip
        }

        const activiy = new Activity(payload)
        await activiy.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})
router.post('/user/logoutFromAll' , auth , async (req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        req.send()
    }catch(e){
        res.status(501).send()
    }
})
 
router.patch("/user/update",auth , async (req , res)=>{
    const update = ['name' , "age" ,"email", 'password']
    const updates = Object.keys(req.body)
    const isVal = updates.every((upd)=>{
            return update.includes(upd)
    })
    if(!isVal){
        return res.status(400).send({error:"invaid action"})
    }
    try{
        updates.forEach((update)=>{
            req.user[update] = req.body[update]
        })
        await req.user.save()
        if(!req.user){
            return res.status(404).send({error:"not found"})
        }
        res.status(200).send(req.user)
    }catch(e){
        res.status(500).send(e.message) 
    }
})
router.delete('/user/delete',auth ,admin_auth, async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.user._id)
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e.message) 
    }
})
router.delete('/user/:id', async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.user._id)
        if(!user){
            return res.status(404).send("not found")
        }
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e.message) 
    }
})

// update 
 
module.exports = router