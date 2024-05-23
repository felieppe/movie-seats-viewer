const { app, BrowserWindow } = require('electron')
const express = require('express')

var win = null;
function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, 
        }
    });
    
    win.loadFile('index.html'); // Load your HTML file
}

app.whenReady().then(createWindow)

/*

    API SERVER

*/

const api = express()
const port = 3000;

api.use(express.json())

api.get('/seat/:id', (req, res) => {
    let id = req.params.id;
    if (id == null || id == "") { res.status(400).json({success: false, error: { code: 400, message: "Missing ID of seat"}}); return; }

    win.webContents.send('book-seat', id)
    res.send(`Seat ${id} is booked!`)
})

api.listen(port, () => {
    console.log(`API server listening at http://localhost:${port}`)
})