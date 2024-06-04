const express = require('express')
const router = express.Router()

const seats = require('./seats')
const heartbeat = require('./heartbeat')

router.use('/seats/', seats)
router.use('/heartbeat/', heartbeat)

module.exports = router