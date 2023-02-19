const eventModel = require('../model/eventModel');

const createEvent = async (req,res)=>{
                 try{
                     let userId = req.params.userId;
                     let data = req.body;
                     data.userId = userId;
                     
                     let day = {"sunday":0,"monday":1,"tuesday":2,"wednessday":3,"thursday":4,"friday":5,"saturday":6}
                     // Set the day of the week for the event (0 = Sunday, 1 = Monday, etc.)
                     let dayTime = data.dayOfTheWeek
                     const inputDay = day[`${dayTime}`] // Wednesday
                     console.log(inputDay);
                     // Set the start time for the event (in 24-hour format)
                     const startTime = data.startTime;

                     // Set the end time for the event (in 24-hour format)
                     const endTime = data.endTime;

                     // Set the number of weeks to schedule the event for
                     const numWeeks = 13;

                     // Get the current date and time
                     const now = new Date();

                     // Calculate the date of the next occurrence of the event
                     const nextDate = new Date(now.getTime());
                     nextDate.setDate(now.getDate() + (inputDay + 7 - now.getDay()) % 7);

                     // Set the start time of the event
                     const startParts = startTime.split(':');
                     nextDate.setHours(parseInt(startParts[0]));
                     nextDate.setMinutes(parseInt(startParts[1]));

                     // Set the end time of the event
                     const endParts = endTime.split(':');
                     const endHours = parseInt(endParts[0]);
                     const endMinutes = parseInt(endParts[1]);

                     // If the end time is before the start time (i.e. event ends the next day), add one day to the end date
                     if (endHours < parseInt(startParts[0])) {
                     nextDate.setDate(nextDate.getDate() + 1);
                     }
                     nextDate.setHours(endHours);
                     nextDate.setMinutes(endMinutes);
                     let arr = []
                     // Schedule the event for the next 90 days
                     for (let i = 0; i < numWeeks; i++) {
                     arr.push(` ${nextDate}`);
                     nextDate.setDate(nextDate.getDate() + 7);
                     }
                     data.scheduleEvent = arr;
                     let savedData = await eventModel.create(data);
                    res.status(201).send({message:"Your event is  created  Successfully", data : savedData})
                 }catch(err){
                    res.status(500).send({message:"Sorry for the inconvenience caused", Error : err.message})
                 }
};

const getEvent = async (req,res)=>{
                try{
                let event = await eventModel.find({userId:req.userId});
                console.log(event);
                res.status(201).send({message:"List of event schedule", data : event})
                }catch(err){
                res.status(500).send({message:"Sorry for the inconvenience caused", Error : err.message})
                }
};


module.exports = {createEvent,getEvent}