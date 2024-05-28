const express = require('express')
const router = express.Router()
const { ipcMain } = require('electron')

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

router.post('/:id', (req, res) => {
    // Try to book the seat related to the ID provided.

    let id = req.params.id;
    if (id == null || id == "") { res.status(400).json({success: false, error: { code: 400, message: "Missing ID of seat"}}); return; }

    let win = req.win
    win.webContents.send('book-seat', id)

    ipcMain.once('data-output', (event, data) => {
        if (data["type"] == "seat-booked-output") {
            if (data["data"]["booked"]) {
                res.status(200).json({success: true, data: data["data"]})
            } else { res.status(400).json({success: false, error: { code: 400, message: data["data"]["error"]}}) }
        }
    })
})

router.delete('/:id', (req, res) => {
    // Try to release the seat related to the ID provided.

    let id = req.params.id;
    if (id == null || id == "") { res.status(400).json({success: false, error: { code: 400, message: "Missing ID of seat"}}); return; }

    let win = req.win
    win.webContents.send('release-seat', id)

    ipcMain.once('data-output', (event, data) => {
        if (data["type"] == "seat-released-output") {
            if (data["data"]["released"]) {
                res.status(200).json({success: true, data: data["data"]})
            } else { res.status(400).json({success: false, error: { code: 400, message: data["data"]["error"]}}) }
        }
    })
})

module.exports = router