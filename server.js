const express = require('express');
const path = require('path');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Function to get the local network IP address
function getLocalIp() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const server = app.listen(PORT, '0.0.0.0', () => {
    const localIp = getLocalIp();
    console.log('\n================================================');
    console.log(`ðŸš€ POLYMARKET BOT RUNNING!`);
    console.log(`ðŸ  LOCAL: http://localhost:${PORT}`);
    console.log(`ðŸ“± MOBILE (HP): http://${localIp}:${PORT}`);
    console.log('================================================\n');
});
