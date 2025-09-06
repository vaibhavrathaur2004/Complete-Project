const express = require('express')
const router = express.Router();
const {createFood,getAllfood,likeFood, saveFood,getSaveFood} = require('../controllers/food')
const multer = require('multer')
const { foodPartnerMiddleware , authUserMiddleware } = require('../middlewares/foodPartnerMiddleware');



const upload = multer({
    storage:multer.memoryStorage(),
})

router.post("/create", foodPartnerMiddleware, upload.single("video"), createFood);
router.get("/allfood",authUserMiddleware,  getAllfood);

router.post("/like",authUserMiddleware,likeFood)
router.post("/save",authUserMiddleware,saveFood)


router.get("/allsaved",authUserMiddleware,getSaveFood)



module.exports = router