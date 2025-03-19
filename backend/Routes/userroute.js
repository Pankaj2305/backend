const express = require('express');
const usercontrol = require('../Controller/usercontroller');

const router = express.Router();

router.post('/signup', usercontrol.Signup);

router.post('/login', usercontrol.Login); 

router.get('/home', usercontrol.Home);

router.put("/Update/:id", usercontrol.updateUser)
router.get("/profile/:id",usercontrol.getId)
router.delete("/delete/:id",usercontrol.deleteUser)
module.exports = router;
