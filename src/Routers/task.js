const express = require('express')

const Task = require('../Models/task')
const auth = require('../middleware/Auth')
const router = new express.Router()




//task creation
router.post('/tasks',auth,async(req, res)=>{
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body,
         owner: req.user._id
    })
  
    try{
        await task.save()
        res.status(201).send(task)
  
    }catch(e){
        res.status(400).send()
    }
  })
  
  //get tasks
  router.get('/tasks', auth, async(req,res)=>{

    const match ={}
    const sort ={}

    if(req.query.completed){
        match.completed = req.query.completed === "true"
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1]=='desc'? -1:1
    }
      try{
        //   const task = await Task.find({owner:req.user._id})
          await req.user.populate({
              path: 'tasks',
              match,
              options:{
                  limit:parseInt(req.query.limit),
                  skip:parseInt(req.query.skip),
                  sort
              }
            
          }).execPopulate()
          res.send(req.user.tasks)
  
      }catch(e){
          res.status(500).send()
      }
  })
  
  //read one task
  router.get('/tasks/:id',auth,async(req,res)=>{
      const _id = req.params.id
      try{
        //   const task = await Task.findById(_id)
        const task = await Task.findOne({_id, owner: req.user.id})
          if(!task){
              return res.status(404).send('there is no such task')
          }
          res.status(200).send(task)
      }catch(e){
          res.status(500).send()
      }
  })
  
  //update task
  router.patch('/tasks/:id', auth, async(req,res)=>{
      const updates =Object.keys(req.body)
      const allowableUpdates = ['description', 'completed']
      const isValidOperation = updates.every((update)=> allowableUpdates.includes(update))
      if(!isValidOperation){
          return res.status(404).send({error:'invaild update'})
      }
      try{
        
       
        const task = await Task.findOne({_id:req.params.id, owner:req.user._id}) 


        if(!task){
            return res.status(404).send()
        }
        updates.forEach((update)=>{
            task[update] = req.body[update]
        })

        await task.save()
        //   const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
  
          
          res.status(201).send(task)
      }catch(e){
          res.status(400).send()
      }
  })
  
  //delete task
  router.delete('/tasks/:id',auth, async(req,res)=>{
     
      
      try{
          const task = await Task.findOneAndDelete({_id:req.params.id, owner:req.user._id})
          if(!task){
              return res.status(404).send('Task not found')
          }
          res.status(200).send(task)
      }catch(e){
          res.status(500).send()
      }
  })
  
  module.exports = router