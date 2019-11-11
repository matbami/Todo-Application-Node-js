const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/task-manager-api', {
useNewUrlParser:true,
useCreateIndex: true,
useUnifiedTopology: true
})

// const User = mongoose.model('User',{

//     name:{
//             type: String
            
//     },
//     age:{
//             type: Number
//     }
// })

// const me = new User({
//     name: 'Tobiga',
//     age: 78
// })

// me.save().then(()=>{
// console.log(me)
// }).catch((error)=>{
// console.log('Error!', error)
// })

const Task = mongoose.model('Task',{
    description:{
        type: String
    },

    completed:{
        type: Boolean
    }
})

const task = new Task({
    description: "my first task",
    completed: false
})
task.save().then(()=>{
 console.log(task)
}).catch((error)=>{
console.log(error)
})
