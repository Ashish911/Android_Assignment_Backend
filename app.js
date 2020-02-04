const express = require("express")
require('./db/mongoose')
const bodyParser = require('body-parser')
const UserRouter = require('./routes/userroute')

const app = express()
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}));

app.use('/user', UserRouter);

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`App is running at localhost: ${port}`)
});