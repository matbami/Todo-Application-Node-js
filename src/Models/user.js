const mongoose = require('mongoose')
const validator = require('validator')

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

module.exports = User