import express from 'express';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Function to get the local network IP address
function getLocalIp() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        const networkInterface = interfaces[name];
        if (networkInterface) {
            for (const iface of networkInterface) {
                if (iface.family === 'IPv4' && !iface.internal) {
                    return iface.address;
                }
            }
        }
    }
    return 'localhost';
}

app.get('/:path*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    const localIp = getLocalIp();
    console.log('\n================================================');
    console.log(`ðŸš€ POLYMARKET BOT RUNNING!`);
    console.log(`ðŸ  LOCAL: http://localhost:${PORT}`);
    console.log(`ðŸ“± MOBILE (HP): http://${localIp}:${PORT}`);
    console.log('================================================\n');
});
