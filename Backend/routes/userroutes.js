const express = require('express')
const router = express.Router();
const {register , login , logout  ,registerfoodpartner , loginfoodpartner ,logoutfoodpartner,} = require('../controllers/auth')


// user
router.post("/user/register",register);
router.post("/user/login",login);
router.get("/user/logout",logout);

// footpartner
router.post("/registerfoodpartner",registerfoodpartner);
router.post("/loginfoodpartner",loginfoodpartner);
router.get("/logoutfoodpartner",logoutfoodpartner);





module.exports = router

