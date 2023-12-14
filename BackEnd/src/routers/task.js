const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()

const Task = require('../models/task') 


router.get("/task/notCompleted" ,auth ,async (req , res)=>{
    try{
        const tasks = await Task.find({owner : req.user._id , completed : false})
        res.status(201).send(tasks)
    }catch(e){
        res.status(500).send(e.message)
    }
})

router.delete('/task/:id',auth , async (req,res)=>{
    const _id = req.params.id
    try{
        const task = await Task.findOneAndDelete({_id , owner:req.user._id})
        if(!task){
            return res.status(404).send("not found")
        }
        res.status(200).send(task)
    }catch(e){
        res.status(500).send(e.message) 
    }
})

router.patch("/task/:id" ,auth ,  async (req , res)=>{
    const _id  = req.params.id
    console.log(_id)
    const update = ['desc' , "completed"]
    const updates = Object.keys(req.body)
    const isVal = updates.every((upd)=>{
            return update.includes(upd)
    })
    if(!isVal){
        return res.status(400).send({error:"Invalid update"})
    }
    try{
        const task  = await Task.findOne({_id  , owner:req.user._id})
        if(!task){
            return res.status(404).send("not found")
        }
        updates.forEach((update)=>{
            task[update] = req.body[update]
        })
        await task.save() 
        res.status(200).send(task)
    }catch(e){
        res.status(500).send(e.message) 
    }
})

router.post("/task", auth , async (req , res)=>{
    const task = new Task({...req.body , owner:req.user._id})
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(500).send(e.message)
    } 
})
router.get("/tasks" ,auth ,async (req , res)=>{
    try{
        const tasks = await Task.find({owner : req.user._id})
        res.status(201).send(tasks)
    }catch(e){
        res.status(500).send(e.message)
    }
})
router.get("/task/:id" ,auth ,async (req , res)=>{
    const _id = req.params.id
    try{
        const task =   await Task.findOne({
            _id , owner: req.user._id
        })
        if(!task){
            return res.status(404).send("not fund")
        }
        res.status(201).send(task)
    }catch(e){
        res.status(500).send(e.message)
    }
})













module.exports = router