const express = require('express')
const router = express.Router()
const { ipcMain } = require('electron')

const { book, reserve, release } = require('./methods')
router.use('/book/', book)
router.use('/reserve/', reserve)
router.use('/release/', release)

router.get('/', (req, res) => {
    // Get status of all the seats.

    let win = req.win
    win.webContents.send('get-all-seats-status')

    ipcMain.once('data-output', (event, data) => {
        if (data["type"] == "all-seats-status-output") {
            res.status(200).json({success: true, data: data["data"]})
        }
    })
})

router.get('/available', (req, res) => {
    // Get status of all the available seats.

    let win = req.win
    win.webContents.send('get-available-seats-status')

    ipcMain.once('data-output', (event, data) => {
        if (data["type"] == "available-seats-status-output") {
            res.status(200).json({success: true, data: data["data"]})
        }
    })
})

router.get('/booked', (req, res) => {
    // Get status of all the booked seats.

    let win = req.win
    win.webContents.send('get-booked-seats-status')

    ipcMain.once('data-output', (event, data) => {
        if (data["type"] == "booked-seats-status-output") {
            res.status(200).json({success: true, data: data["data"]})
        }
    })
})

router.get('/reserved', (req, res) => {
    // Get status of all the reserved seats.

    let win = req.win
    win.webContents.send('get-reserved-seats-status')

    ipcMain.once('data-output', (event, data) => {
        console.log(data)
        if (data["type"] == "reserved-seats-status-output") {
            res.status(200).json({success: true, data: data["data"]})
        }
    })
})

router.get('/:id', (req, res) => {
    // Get status of the seat related to the ID provided.

    let id = req.params.id;
    if (id == null || id == "") { res.status(400).json({success: false, error: { code: 400, message: "Missing ID of seat"}}); return; }

    let win = req.win
    win.webContents.send('get-seat-status', id)

    ipcMain.once('data-output', (event, data) => {
        if (data["type"] == "seat-status-output") {
            res.status(200).json({success: true, data: data["data"]})
        }
    })
})

module.exports = router