const express = require('express');
const mongoose = require('mongoose');
const route = require('../src/routes/route');
var cors = require('cors')
const app = express()
app.use(express.json());
app.use(cors());


mongoose.connect('mongodb+srv://AkshayMakwana:Akshay123@cluster0.zmta9.mongodb.net/event-schedule-DB?retryWrites=true&w=majority',
{
    useNewUrlParser: true
})
.then(()=>{
    console.log('mongodb is connected')
})
.catch((err)=>{
    console.log(err);
})
app.use('/',route)

app.listen(3000, ()=>{
    console.log('server start');
});