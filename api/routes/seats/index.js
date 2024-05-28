const express = require('express')
const router = express.Router()

router.get('/:id', (req, res) => {
    // Get status of the seat related to the ID provided.
})

router.post('/:id', (req, res) => {
    // Try to book the seat related to the ID provided.

    let id = req.params.id;
    if (id == null || id == "") { res.status(400).json({success: false, error: { code: 400, message: "Missing ID of seat"}}); return; }

    let win = req.win
    win.webContents.send('book-seat', id)

    res.send(`Seat ${id} is booked!`)
})

router.delete('/:id', (req, res) => {
    // Try to release the seat related to the ID provided.
})

module.exports = router