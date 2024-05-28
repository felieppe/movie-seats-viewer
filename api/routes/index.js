const express = require('express')
const router = express.Router()

const seats = require('./seats')

router.use('/seats/', seats)

module.exports = router