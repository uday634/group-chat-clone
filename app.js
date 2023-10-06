const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routuser = require('./routes/user')
const sequelize = require('./util/database')
const port = 4000


const app = express()


app.use(cors())
app.use(bodyParser.json())
app.use('/user',routuser)

sequelize.sync()
.then(()=>{
    app.listen(4000)
})
.catch(err => console.log(err))