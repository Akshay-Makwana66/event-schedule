const express = require('express');
const router = express.Router();

const {signupUser,loginUser} = require('../controller/signupandlogincontroller');
const {createEvent,getEvent} = require('../controller/eventController');
const {userAuthentication} = require('../middleware/authentication')
const {signupValidations,loginValidations,eventValidations} = require('../middleware/validations');

// API"s
router.post('/userRegistration',signupValidations, signupUser);
router.post('/userLogin', loginValidations,loginUser);
router.post('/eventCreate/:userId',userAuthentication,eventValidations,createEvent);
router.get('/getScheduleEvent',userAuthentication,getEvent);

module.exports = router;      