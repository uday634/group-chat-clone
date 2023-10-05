const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routuser = require('./routes/user')


const app = express()


app.use(cors())
app.use(bodyParser.json())
app.use(routuser)

app.listen(3000)