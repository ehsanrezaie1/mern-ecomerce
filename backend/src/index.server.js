const  express = require("express");
const app = new express()
const env = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//--router
const userRoutes = require('./routes/user');
env.config();

//mongo cconnect
//mongodb+srv://admin:<password>@cluster0.nemcu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority


mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.nemcu.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=>{
    console.log('conneccted')
});

//app.use(express.json());
app.use(bodyParser());
app.use('/api',userRoutes);
/*
app.get('/',function(req,res,next){
    res.status(200).json({
        message: 'response from server'
    })
});


app.post('/data',function(req,res,next){
    res.status(200).json({
        message: req.body
    })
});
*/

app.listen(process.env.PORT, ()=>{
    console.log('server is running on port:'+process.env.PORT);
});