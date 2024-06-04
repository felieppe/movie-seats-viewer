const express = require('express')
const router = express.Router()
const { ipcMain } = require('electron')

router.post('/:id', (req, res) => {
    // Try to reserve the seat related to the ID provided.

    let id = req.params.id;
    if (id == null || id == "") { res.status(400).json({success: false, error: { code: 400, message: "Missing ID of seat"}}); return; }

    let win = req.win
    win.webContents.send('reserve-seat', id)

    ipcMain.once('data-output', (event, data) => {
        if (data["type"] == "seat-reserved-output") {
            if (data["data"]["reserved"]) {
                res.status(200).json({success: true, data: data["data"]})
            } else { res.status(400).json({success: false, error: { code: 400, message: data["data"]["error"]}}) }
        }
    })
})

module.exports = router