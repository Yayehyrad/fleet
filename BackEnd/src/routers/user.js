const express = require('express')
const User = require('../models/user') 
const auth = require('../middleware/auth')
const router = new express.Router()

router.post("/users" , async (req , res)=>{
    const user = new User(req.body)
    try{
        await  user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user , token})
    }catch(error){
        res.status(500).send(error.message)
    }    
})
router.post('/user/login' , async (req, res )=>{
    try{
        const user = await User.findByCredentias(req.body.email , req.body.password)
        const token = await user.generateAuthToken()
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
router.delete('/user/delete',auth , async (req,res)=>{
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