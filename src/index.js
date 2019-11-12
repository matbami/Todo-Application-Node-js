const express = require('express')

require('./db/mongoose.js')
const User = require('./Models/user')
const Task = require('./Models/task')
const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

//user creation
app.post('/users',(req,res)=>{
    const user = new User(req.body)

    user.save().then(()=>{
        res.status(201).send(user)

    }).catch((e)=>{
        res.status(400).send(e)
    })
    
})

//get all users
app.get('/users', (req,res)=>{
    User.find({}).then((users)=>{
        res.send(users)
    }).catch((err)=>{
        res.status(500).send(err)
    })
})

//get a single task

app.get('/users/:id', (req,res)=>{
    const _id = req.params.id
    User.findById(_id).then((user)=>{
        if(!user){
           return  res.status(404).send('User not found')
        }
        res.send(user)
    }).catch(()=>{
        res.status(500).send()  
    })
})


//task creation
app.post('/tasks',(req, res)=>{
  const task = new Task(req.body)

  task.save().then(()=>{
    res.status(201).send(task)
  }).catch((e)=>{
    res.status(400).send(e)
  })
})

app.get('/tasks',(req,res)=>{
    Task.find({}).then((tasks)=>{
        res.status(200).send(tasks)
    }).catch((error)=>{
        res.status(500).send(error)
    })
})

app.get('/tasks/:id',(req,res)=>{
    const _id = req.params.id
    Task.findById(_id).then((task)=>{
        if(!task){
            res.status(404).send("Task not found")
        }
        res.status(200).send(task)
    }).catch(()=>{
        res.status(500).send()
    })
})
app.listen(port, ()=>{
    console.log('Server is up and running on port ' + port);
})