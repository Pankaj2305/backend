const express = require('express');
const usercontrol = require('../Controller/usercontroller');

const router = express.Router();

router.post('/signup', usercontrol.Signup);

router.post('/login', usercontrol.Login); 

module.exports = router;
