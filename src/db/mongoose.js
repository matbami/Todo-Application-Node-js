const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://localhost/task-manager-api', {
useNewUrlParser:true,
useCreateIndex: true,
useUnifiedTopology: true
})

const User = mongoose.model('User',{

    name:{
            type: String,
            required: true,
            trim: true
            
    },
    age:{
            type: Number,
            default: 0,
            validate(value){
                if(value<0){
                    throw new Error('Age must be a positive number')
                }
            }
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,

        validate(value){
           if(!validator.isEmail(value)){
               throw new Error("Email is invalid")
           }
        }
    },
    password:{
        type:String,
        required: true,
        trim: true,
        validate(value){
            if(value.length<6){
                throw new Error("password less than 6 characters")
            }
            if(validator.contains(value,'password')){
                throw new Error('password contains password, too easy too guess')
            }

        }

    }
})

// const me = new User({
//     name: ' Mummcy   ',
   
//     email: '  GSSDNL@GMAIL.COM  ',
//     password:'tyunb4588en'
// })

// me.save().then(()=>{
// console.log(me)
// }).catch((error)=>{
// console.log('Error!', error)
// })

const Task = mongoose.model('Task',{
    description:{
        type: String,
        trim: true,
        required: true
    },

    completed:{
        type: Boolean,
        default: false
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
