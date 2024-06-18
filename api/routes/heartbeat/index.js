const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({ success: true, data: { message: 'Server is up and running' } })
})

module.exports = router
