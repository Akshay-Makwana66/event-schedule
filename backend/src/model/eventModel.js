const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
var eventSchema = new mongoose.Schema({
    userId:{
        type: ObjectId,
        ref:"Signup",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startTime:{
        type: String,
        required: true,
        unique: true
    },
    endTime: {
        type: String,
        required: true
    },
    dayOfTheWeek:{
        type:String,
        required: true
    },
    eventTime:{
        type: []
    },
    scheduleEvent:{
        type: []  
    }
}, {timestamps:true});

module.exports = mongoose.model("Event",eventSchema);