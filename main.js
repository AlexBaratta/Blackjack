// Require necessary modules
const { app, BrowserWindow } = require('electron');

// Create the main window
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Load the HTML file
  mainWindow.loadFile('index.html');
}

// Event handler for when the app is ready
app.whenReady().then(createWindow);

// Event handler for when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Event handler for when the app is activated
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});