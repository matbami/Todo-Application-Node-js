const express = require('express')

require('./db/mongoose.js')


const userRouter = require('./Routers/user.js')
const taskRouter = require('./Routers/task.js')
const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

// const router = new express.Router()
// router.get('/test',(req,res) =>{
//     res.send('this is from another router')
// })

// app.use(router)
app.use(userRouter)
app.use(taskRouter)





app.listen(port, ()=>{
    console.log('Server is up and running on port ' + port);
})