const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        });
    } else if (req.url === '/questions') {
        fs.readFile(path.join(__dirname, 'questions.json'), (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(content);
            }
        });
    } else {
        const filePath = path.join(__dirname, 'public', req.url);
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File Not Found');
            } else {
                let ext = path.extname(req.url);
                let contentType = 'text/plain';
                if (ext === '.css') contentType = 'text/css';
                if (ext === '.js') contentType = 'text/javascript';
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content);
            }
        });
    }
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
