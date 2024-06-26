const express = require('express')
const router = express.Router()
const { ipcMain } = require('electron')

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