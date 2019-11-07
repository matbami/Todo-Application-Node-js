//CRUD

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
const {MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error,client)=>{
if(error){
    console.log('unable to connect to database')
}


const db = client.db(databaseName)

// db.collection('Tasks').updateMany({
//     completed: false
//  }, { 
//     $set: {
//         completed: true
//     }
// }).then((result)=>{
// console.log(result)
// }).catch((error)=>{
// console.log(error)
// })
// })

db.collection('Tasks').deleteOne({
    description:"this is my first task"
 
    
}).then((result)=>{
console.log(result)
}).catch((error)=>{
console.log(error)
})
})