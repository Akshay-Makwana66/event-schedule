const signupModel = require('../model/signupModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltrounds = 10;

const signupUser = async (req,res)=>{
                try{
                    let data = req.body;
                    data.password = await bcrypt.hash(data.password,saltrounds);
                    let savedData = await signupModel.create(data);
                    res.status(201).send({message:"Your Registration Is Successfully Done", data : savedData})
                }catch(err){
                    res.status(500).send({message:"Sorry for the inconvenience caused", Error : err.message})
                }                
}

const loginUser = async (req,res)=>{
                try{
                    let data = req.body;
                    let userEmail = data.email;
                    let checkId = await signupModel.findOne({email:userEmail});
                    if(!checkId){
                        return res.status(401).send({message: "emailId is not registered"})
                    }
                    let userPassword = data.password
                    let decryptPassword = await bcrypt.compare(userPassword,checkId.password);
                    // console.log(decryptPassword);
                    if(!decryptPassword){
                       return res.status(401).send({message: "password is incorrect"})
                    }

                     //Creating token if E-mailId and password is correct -
                    let token= jwt.sign({
                        userId:checkId._id.toString()
                    },"event-schedule");
                     //Sending token in response body
                    res.status(201).send({message:"You are Successfully loggedIn, ThankYou", data:token, userId:checkId._id})
                }catch(err){
                    res.status(500).send({message:"Sorry for the inconvenience caused", Error : err.message})
                }
}

module.exports = {signupUser,loginUser}