const express = require('express')
const config = require('./config/config')
const adminConn= require('./adminMongoConn')
const routes=require('./routes/allRoutes')

const app=express()
app.use(routes)

app.listen(config.port,(error)=>{
    if(error){
        console.log(error)
    } else {
        console.log("Backend running on port ", config.port)
    }
})