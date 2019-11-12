const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/task-manager-api', {
useNewUrlParser:true,
useCreateIndex: true,
useUnifiedTopology: true
})






 