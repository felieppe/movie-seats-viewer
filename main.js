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
api.use((req, res, next) => { req.win = win; next(); })

const routes = require('./api/routes')
api.use('/', routes)

api.listen(port, () => {
    console.log(`API server listening at http://localhost:${port}`)
})