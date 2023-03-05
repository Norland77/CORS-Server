import express from 'express';
import path from 'path';
import cors_proxy from 'cors-anywhere';


const app = express();
const PORT1 = process.env.PORT || 8080;
const PORT2 = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'react')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'react', 'index.html'));
});

cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(PORT1, () => {
    console.log('CORS Anywhere server running on port ' + PORT1);
});

app.listen(PORT2, () => {
    console.log('React app running on port ' + PORT2);
});