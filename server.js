const express = require('express')
const allRoutes = require('./routes/routes')
const {connect} = require('./config/server')
const app = express()

connect()
require('dotenv').config()
const port = process.env.port || 5000
app.use(express.json())
app.use("/api/v1",allRoutes)

app.listen(port,()=>{
    console.log(`we are listening at ${port}`)
})
