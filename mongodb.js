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

db.collection('Tasks').findOne({ _id: new ObjectID("5dbc3b95195b1c1854919e1b")} , (error,user) =>{
if(error){
    return console.log('unable to connect')
}

console.log(user)
})

db.collection('Tasks').find({completed:false}).toArray((error,user)=>{
   console.log(user)
})

})