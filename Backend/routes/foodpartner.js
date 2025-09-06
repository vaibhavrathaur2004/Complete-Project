const express = require('express')
const router = express.Router()
const {authUserMiddleware} = require('../middlewares/foodPartnerMiddleware')
const {getFoodPertnerBtId} = require('../controllers/foodpartner')

router.get("/:id",authUserMiddleware,getFoodPertnerBtId)

module.exports = router