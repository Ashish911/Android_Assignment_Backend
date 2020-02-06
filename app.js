const express = require("express")
require('./db/mongoose')
const bodyParser = require('body-parser')
const UserRouter = require('./routes/userroute')
const CategoryRouter = require('./routes/categoryroute')

const app = express()
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}));

app.use('/user', UserRouter);
app.use('/category', CategoryRouter);


const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`App is running at localhost: ${port}`)
});