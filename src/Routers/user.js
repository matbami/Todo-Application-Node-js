const express = require('express')
const User = require('../Models/user')
const router = new express.Router()
const auth = require('../middleware/Auth')

//user creation 
router.post('/users', async(req,res)=>{
    const user = new User(req.body)

    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.send({user,token})
       
    } catch(e){
        res.status(400).send(e)
    }
    
})

//user login

router.post('/user/login', async(req,res)=>{
    // const user = new User(req.body)
    // const criteria = {email:req.body.email,password:req.body.password}

    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    }
    catch(e){
       
        res.status(400).send("fail")
    }
})

//user log out
router.post('/user/logout', auth, async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !==req.token
        })
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send()
    }
})

//log out of all

router.post('/user/logoutAll',auth,async(req,res)=>{
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
        
    }
})
 
//get all users
router.get('/users/me', auth ,async(req,res)=>{
  res.send(req.user)
})

//get a single task

// router.get('/users/:id', async(req,res)=>{
   
//     const _id = req.params.id
//     try{
//         const user = await User.findById(_id)
//         if(!user){
//             return res.status(404).send('User not found')
//         }
//         res.status(200).send(user)
//     }catch(e){
//         res.status(500).send()
//     }
// })

//update user

router.patch('/users/me', auth, async(req,res)=>{
    const updates =Object.keys(req.body)
    const allowableUpdates = ['name', 'email', 'age', 'password']
    const isValidOperation = updates.every((update)=> allowableUpdates.includes(update))
    if(!isValidOperation){
        return res.status(404).send({error:'invaild update'})
    }
    try{

       

        updates.forEach((update)=>{
            req.user[update] = req.body[update]
        })

        await req.user.save()
        // const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})

        // if(!user){
        //     res.status(404).send('User not found')
        // }
        res.status(201).send(req.user)
    }catch(e){
        res.status(400).send()
    }
})

//delete user
router.delete('/users/me', auth, async(req,res)=>{
   
    
    try{
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(404).send('User not found')
        // }

        await req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router

