const signupModel = require('../model/signupModel');
const eventModel = require('../model/eventModel');
const mongoose = require('mongoose');

const signupValidations = async function (req, res, next) {
    try {
      let data = req.body;
      // Checks whether body is empty or not  
      if (Object.keys(data).length == 0)return res.status(400).send({ status: false, msg: "Body cannot be empty" });
  
      // Checks whether first name is empty or is enter as a string or contains only letters  
      if (!data.firstName)return res.status(400).send({ status: false, msg: "Please enter firstName" });  
      if (typeof data.firstName !== "string")return res.status(400).send({ status: false, msg: " Please enter firstName as a String" });  
      let validfirstName = /^\w[a-zA-Z.]*$/;
      data.firstName = data.firstName.trim();  
      if (!validfirstName.test(data.firstName))return res.status(400).send({ status: false, msg: "The firstName may contain only letters" });
  
      // Checks whether last name is empty or is enter as a string or contains only letters  
      if (!data.lastName)return res.status(400).send({ status: false, msg: "Please enter lastName" });  
      if (typeof data.lastName !== "string")return res.status(400).send({ status: false, msg: "Please enter lastName as a String" });  
      let validlastName = /^\w[a-zA-Z.]*$/;
      if (!validlastName.test(data.lastName))return res.status(400).send({ status: false, msg: "The lastName may contain only letters" });  
      data.lastName = data.lastName.trim();

      // Checks whether email is empty or is enter as a string or is a valid email or already exists
    if (!data.email)return res.status(400).send({ status: false, msg: "Please enter E-mail" });
    if (typeof data.email !== "string")return res.status(400).send({ status: false, msg: "Please enter email as a String" });
    let email = data.email;
     if (!/^([0-9a-z]([-_\\.]*[0-9a-z]+)*)@([a-z]([-_\\.]*[a-z]+)*)[\\.]([a-z]{2,9})+$/.test(email))return res.status(400).send({ status: false, msg: "Entered email is invalid" });
    let duplicateEmail = await signupModel.find({ email: email });
    if (duplicateEmail.length !== 0)return res.status(400).send({ status: false, msg: `${email} already exists` });

    // Checks whether password is empty or is enter as a string or a valid pasword.
    if (!data.password)return res.status(400).send({ status: false, msg: "Please enter Password" });
    if (typeof data.password !== "string")return res.status(400).send({ status: false, msg: " Please enter password as a String" });
    let validPassword =/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    if (!validPassword.test(data.password))return res.status(400).send({status: false,msg: "Please enter min 8 letter password, with at least a symbol, upper and lower case letters and a number"});

    next();  
    }catch(err){
        res.status(500).send({message:"Sorry for the inconvenience caused", Error : err.message})
    }
}

const loginValidations = async(req,res,next)=>{
    try{
        let data = req.body;
        // Checks whether body is empty or not
        if (Object.keys(data).length == 0)return res.status(400).send({ status: false, msg: "Body cannot be empty"});
          // Checks whether email is entered or not
        if (!data.email) return res.status(400).send({ status: false, msg: "Please enter E-mail"});
        // Checks whether password is entered or not
        if (!data.password) return res.status(400).send({ status: false, msg: "Please enter Password" });
        
        next();       
        }catch(err){
         res.status(500).send({ message:'Sorry, for the inconvenience caused', msg: err.message });
        }
};

const eventValidations = async (req,res,next) =>{
    try{
         let data = req.body;
         let userId = req.params.userId;
         
        //  checks userId valid or not.
         if(Object.keys(data).length==0) return res.status(400).send({message: 'Body cannot be empty'});
         if(!mongoose.isValidObjectId(userId)) return res.status(400).send({message: 'write valid userId as a ObjectId'});
         let checkUserId = await signupModel.findOne({_id: userId})
         if(!checkUserId) return res.status(400).send({message: 'write valid userId'});

         // Checks whether name is empty or is enter as a string or contains only letters  
         if (!data.name)return res.status(400).send({ status: false, msg: "Please enter name" });  
         if (typeof data.name !== "string")return res.status(400).send({ status: false, msg: " Please enter name as a String" });  
         let validname = /^\w[a-zA-Z.]*$/;        
         data.name = data.name.trim();        
         if (!validname.test(data.name))return res.status(400).send({ status: false, msg: "The name may contain only letters" });
        
         // Checks whether description is empty or is enter as a string or contains only letters or numbers.  
         if (!data.description)return res.status(400).send({ status: false, msg: "Please enter description" });  
         if (typeof data.description !== "string")return res.status(400).send({ status: false, msg: " Please enter description as a String" });  
         let validdescription = /^\w[a-zA-Z.,[0-9]]*$/;        
         data.description = data.description.trim();        
         if (!validdescription.test(data.description))return res.status(400).send({ status: false, msg: "The description may contain only letters" });
        
         next();
    }catch(err){
         res.status(500).send({ message:'Sorry, for the inconvenience caused', msg: err.message });
    }
}

module.exports = {signupValidations,loginValidations,eventValidations}