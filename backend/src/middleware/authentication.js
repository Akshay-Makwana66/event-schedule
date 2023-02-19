const jwt = require('jsonwebtoken');

const userAuthentication = async (req,res,next)=>{
                try{
                    let token = req.headers['x-api-key'];
                    if(!token) return res.status(400).send({message: "Please, Enter token in header"});
                    jwt.verify(token,'event-schedule',(err,decoded)=>{
                    if(err) return res.status(401).send({message: "Enter token is Invalid"})
                    else
                    req.userId = decoded.userId
                    next();
                    })
                }catch(err){
                    res.status(500).send({message:"Sorry for the inconvenience caused", Error : err.message})
                }
}

module.exports = {userAuthentication}